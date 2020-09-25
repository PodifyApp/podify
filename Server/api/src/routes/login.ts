import{ Router } from 'express'
import { catchAsync, guest, auth } from '../middleware'
import { baseUser, User } from '../entity'
import { BadRequest, Unauthorized } from '../errors'
import { logIn, logOut } from '../auth'
import { getRepository } from 'typeorm'
import { validate, ValidationError } from 'class-validator'

const router = Router()

//Allow this route to only users with guest role
router.post('/login', guest, catchAsync(async(req, res) => {
    const userRepository = await getRepository(User)

    const { email, password } = req.body

    let existingUser = new baseUser()
    existingUser.email = email
    existingUser.password = password

    await validate(existingUser).then(async errors => {
        if (errors.length > 0) {
            const err = errors.map((error: ValidationError) => 
            Object.values(error.constraints!)).join(', ');

            throw new BadRequest(err);
        } else {
            const user = await userRepository.createQueryBuilder("users")
                                                .where("users.email = :email", { email: email })
                                                .addSelect("users.password")
                                                .getOne()

            if (!user || !(await user.matchesPassword(password))) {
                throw new Unauthorized('Incorrect email or password')
            }
        
            logIn(req, user.id.toString())
        
            res.json({ message: 'OK' })
        }
    })
}))

//Allow this route to only users who're logged in (auth role)
router.post('/logout', auth, catchAsync(async(req, res) => {
    await logOut(req, res)

    //res.json({ message: 'OK' })
}))

export default router
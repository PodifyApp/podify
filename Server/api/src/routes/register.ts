import { Router } from 'express'
import { logIn } from '../auth'
import { guest, catchAsync } from '../middleware'
import { BadRequest } from '../errors'
import { getRepository } from 'typeorm'
import { User } from '../entity'
import { validate, ValidationError } from 'class-validator'


const router = Router()

//Allow this route to only users with guest role
router.post('/register', guest, catchAsync(async (req, res) => {
    const userRepository = await getRepository(User)

    const { email, name, password, passwordConfirmation } = req.body

    let newUser = new User()
    newUser.email = email
    newUser.name = name
    newUser.password = password
    newUser.passwordConfirmation = passwordConfirmation

    await validate(newUser).then(async errors => {
        if (errors.length > 0) {
            const err = errors.map((error: ValidationError) => 
            Object.values(error.constraints!)).join(', ');
            throw new BadRequest(err);
        } else {
            const found = await userRepository.count({ email: email })
    
            if (found != 0) {
                //Email exist on the database, but to improve security don't directly tell it does, 
                //that's why indicate a general message of invalid email
                throw new BadRequest('Invalid email')
            }
    
            //Save does create new or update if it already exists, insert does create new
            const user = await userRepository.save(newUser)
    
            logIn(req, user.id.toString())
    
            res.json({ message: 'OK' })
        }
    })
}))

export default router
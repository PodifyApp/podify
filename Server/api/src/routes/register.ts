import { Router } from 'express'
import { registerSchema, validate } from '../validation'
import { User } from '../models'
import { logIn } from '../auth'
import { guest, catchAsync } from '../middleware'
import { BadRequest } from '../errors'


const router = Router()

//Allow this route to only users with guest role
router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(registerSchema, req.body)

    const { email, name, password } = req.body

    const found = await User.exists({ email })

    if (found) {
        //Email exist on the database, but to improve security don't directly tell it does, 
        //that's why indicate a general message of invalid email
        throw new BadRequest('Invalid email')
    }

    const user = await User.create({
        email, name, password
    })

    logIn(req, user.id)

    res.json({ message: 'OK' })
}))

export default router
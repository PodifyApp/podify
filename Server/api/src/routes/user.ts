import { Router } from 'express'
import { getRepository } from 'typeorm';
import { catchAsync, auth } from '../middleware'
import { User } from '../entity'

const router = Router()

//Allow this route to only users who're logged in (auth role)
router.get('/user', auth, catchAsync(async (req, res) => {
    const userRepository = await getRepository(User)
    const user = await userRepository.findOne(req.session!.userId)
    res.json(user)
}))

export default router
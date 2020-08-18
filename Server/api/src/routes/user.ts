import { Router } from 'express'
import { catchAsync, auth } from '../middleware'
import { User } from '../models'

const router = Router()

//Allow this route to only users who're logged in (auth role)
router.get('/user', auth, catchAsync(async (req, res) => {
    const user = await User.findById(req.session!.userId)
    res.json(user)
}))

export default router
import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

export const userRoute = Router()

userRoute.route('/v1/user')
    .get(UserController.getAll)
    .post(UserController.create)

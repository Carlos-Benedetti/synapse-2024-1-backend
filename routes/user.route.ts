import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { Connection } from 'mysql2/promise'
import { UserRepository } from '../services/user.service'

export function userRoute(db: Connection) {
    const repository = new UserRepository(db)
    const controller = new UserController(repository)

    const router = Router()
    router.route('/v1/user')
        .get((req,res)=>controller.getAll(req,res))
        .post((req,res)=>controller.create(req,res))
    
    router.route('/v1/user/:id')
        .get((req,res)=>controller.get(req,res))
        .delete((req,res)=>controller.delete(req,res))
    

    return router
}

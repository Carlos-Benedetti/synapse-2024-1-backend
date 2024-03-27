import { RequestHandler } from "express"
import { fakeUsers } from "../fake-user.db"
import { User } from "../models/user.model"

export class UserController {
    static getAll: RequestHandler = (req, res, next) => {
        res
            .status(200)
            .json(fakeUsers)
    }
    static create: RequestHandler = (req, res, next) => {
        const body = req.body
        const newUser = new User(body.id,body.name,body.email,body.password)
        fakeUsers.push(newUser)
        res
            .status(201)
            .json(newUser)
    }
}
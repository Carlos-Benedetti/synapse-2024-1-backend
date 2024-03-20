import { RequestHandler } from "express"
import { fakeUsers } from "../fake-user.db"

export class UserController {
    static getAll: RequestHandler = (req, res, next) => {
        res
            .status(200)
            .json(fakeUsers)
    }
}
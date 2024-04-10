import { Router, Express } from "express";
import { Connection } from "mysql2/promise";
import { UserController } from "../controllers/user.controller";

export class UserRoute {

    private userController: UserController

    constructor(public app: Express, public db: Connection) {
        this.userController = new UserController(db)

        const router = Router()
        router.route('/v1/user')
            .get((req, res) => this.userController.getAll(req, res))

        app.use(router)
    }
}
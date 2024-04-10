import { Request, Response } from "express"
import { User } from "../models/user.model"
import { Connection } from "mysql2/promise"
import { UserRepository } from "../repositories/user.repository"

export class UserController {

    private userRepository: UserRepository

    constructor(public db: Connection) {
        this.userRepository = new UserRepository(db)
    }

    /**
     * Criar o usuario 
     */
    create(db:Connection    ) {
        throw new Error("não implementado ainda");
    }

    async getAll(req: Request, res: Response) {
        const users: User[] = await this.userRepository.getAll()
        res.status(200).json(users)
    }

    /**
    * Apaga um usuario
    */
    delete(): void {
        throw new Error("não implementado ainda");
    }

    /**
     * atualiza um usuario
     */
    update(): User {
        throw new Error("não implementado ainda");
    }
}
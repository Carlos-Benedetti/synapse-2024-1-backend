import { Request, Response } from "express"
import { User } from "../models/user.model"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { EntityController } from "./EntityController"
import { UserRepository } from "../services/user.service"

export class UserController {

    constructor(private repository: UserRepository) { }

    /**
     * Retorna todas as entidades
     */
    public async getAll(req: Request, res: Response): Promise<void> {
        const users = await this.repository.getAll();
        res.status(200).json(users);
    }

    /**
     * Insere uma nova entidade no banco
     * @param entity O Objeto contenco as propriedades da nova entidade
     */
    public async create(req: Request, res: Response): Promise<void> {
        const entity = this.validadeBody(req, res);
        console.log(entity)
        const user = await this.repository.create(entity);
        res.status(201).json(user);
    }

    /**
     * Busca uma entidade por ID
     * @param id ID da entidade desejada
     */
    public async get(req: Request, res: Response){
        const id = Number(req.params.id);
        const user = await this.repository.get(id);
        res.status(200).json(user);
    }

    /**
     * Delete uma entidade do banco por ID
     * @param id ID da entdade para deletar
     */
    public async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        await this.repository.delete(id);
        res.sendStatus(200)
    }

    /**
     * Atualiza uma entidade no banco e a retorna
     * @param id ID da entidade a atualizar
     * @param entity Objeto da nova entidade
     */
    public update(req: Request, res: Response){
        const id = Number(req.params.id);
        const entity = this.validadeBody(req, res);
        return this.repository.update(id, entity);
        res.status(200).json(entity)
    }

    private validadeBody(req: Request, res: Response): User {
        return User.serialyze(req.body)
    }

    

    
}
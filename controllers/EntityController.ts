import { Request, Response } from "express";
import { EntityRepository } from "../services/user.service";


export abstract class EntityController<T> {
    constructor(private repository: EntityRepository<T>) { }

    public abstract validadeBody(req: Request, res: Response): T;

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
        const user = await this.repository.create(entity);
        res.status(201).json(user);
    }

    /**
     * Busca uma entidade por ID
     * @param id ID da entidade desejada
     */
    public async get(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const user = await this.repository.get(id);
        res.status(200).json(user);
    }

    /**
     * Delete uma entidade do banco por ID
     * @param id ID da entdade para deletar
     */
    public delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }

    /**
     * Atualiza uma entidade no banco e a retorna
     * @param id ID da entidade a atualizar
     * @param entity Objeto da nova entidade
     */
    public update(id: number, entity: T): Promise<T> {
        return this.repository.update(id, entity);
    }

}

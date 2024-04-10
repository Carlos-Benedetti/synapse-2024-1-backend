import { Connection, FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { IUser, User } from "../models/user.model";

export interface EntityRepository<T> {
    /**
     * Retorna todas as entidades
     */
    getAll(): Promise<T[]>

    /**
     * Busca uma entidade por ID
     * @param id ID da entidade desejada
     */
    get(id: number): Promise<T>

    /**
     * Delete uma entidade do banco por ID
     * @param id ID da entdade para deletar
     */
    delete(id: number): Promise<void>

    /**
     * Atualiza uma entidade no banco e a retorna
     * @param id ID da entidade a atualizar
     * @param entity Objeto da nova entidade
     */
    update(id: number, entity: T): Promise<T>

    /**
     * Insere uma nova entidade no banco
     * @param entity O Objeto contenco as propriedades da nova entidade
     */
    create(entity: T): Promise<T>
}

export class UserRepository implements EntityRepository<User>{

    constructor(public db: Connection) { }

    async get(id: number): Promise<User> {
        const [[res]]: [IUser[], FieldPacket[]] = await this.db.query<User[] & RowDataPacket[][]>('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (!res) {
            throw new Error(`Usuario de id ${id} não encontrado`);
        }
        return User.serialyze(res)
    }

    async delete(id: number): Promise<void> {
        await this.db.query<ResultSetHeader>('DELETE FROM usuarios WHERE id = ?', [id]);
        return
    }
    async update(id: number, entity: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async create(entity: User): Promise<User> {
        const [res]: [ResultSetHeader,any] = await this.db.query<ResultSetHeader>('INSERT INTO usuarios (name,email,password) VALUES (?,?,?)', [entity.name, entity.email, entity.password]);
        return this.get(res.insertId)
    }

    async getAll(): Promise<User[]> {
        const [res]: [IUser[], FieldPacket[]] = await this.db.query<User[] & RowDataPacket[][]>('SELECT * FROM usuarios');
        return res.map(p => User.serialyze(p))

    }
}
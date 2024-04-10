import { Connection } from "mysql2/promise";
import { User } from "../models/user.model";

export class UserRepository{
    constructor(public db:Connection){
    }
    /**
     * Criar o usuario 
     */
    create():User{
        throw new Error("não implementado ainda");
    }

    /**
     *  pegar os usuarios 
     */
    async getAll():Promise<User[]>{
        const [result] = await this.db.query<any>('SELECT * FROM usuarios')
        return result
    }

    /**
     * Apaga um usuario do banco
     */
    delete():void{
        throw new Error("não implementado ainda");
    }

    /**
     * atualiza um usuario do banco
     */
    update():User{
        throw new Error("não implementado ainda");
    }



}


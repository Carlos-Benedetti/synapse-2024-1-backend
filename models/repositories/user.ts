import { Connection } from "mysql2/promise"
import { User } from "../user.model";

export class UserRepository{

    constructor(public db:Connection){

    }

    async getAll():Promise<User[]>{
        const res = await this.db.query('SELECT * FROM users');
        return res[0] as User[]
        
    }
}
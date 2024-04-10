export interface IUser{
    id:number
    name:string
    email:string
    password:string
}
export class User implements IUser{
    id: number
    name: string
    email: string
    password: string

    constructor(id:number,name:string,email:string,password:string){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    static serialyze(local:IUser):User{
        return new User(local.id,local.name,local.email,local.password)
    }
}
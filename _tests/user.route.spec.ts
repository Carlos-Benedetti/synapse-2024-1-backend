/**
 * 
 * 
 * 
 * 
 *  NÃO MODIFICAR
 *  by Crotaarlos
 * 
 * 
 * 
 * 
 * 
 */
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { User } from '../models/user.model'
import { TestUtils } from './test-utils';

const UserRoute = 'http://localhost:8080/v1/user';
function createOptHeaders(): Headers {
    const h = new Headers();
    h.append('Access-Control-Request-Headers', 'X-PINGOTHER')
    h.append('Access-Control-Request-Headers', 'Content-Type')
    return h
}
function getMethos() {
    return fetch(UserRoute, {
        method: "OPTIONS", headers: createOptHeaders()
    })
        .then(res => res.text())
        .then(res => res.split(','))
}

let testUser:User
describe('Ações de rota de usuario', () => {
    beforeAll(()=>{
        testUser = new User(TestUtils.intGen(4,99), TestUtils.intStr(), TestUtils.intStr()+'@test.com', TestUtils.intStr())
    })
    beforeEach(async () => {
        await import('../server')
    })
    
    it('Deve listar todos os usuário', async () => {
        const methods = await getMethos()
        expect(methods).toContain("GET")
        const users = await fetch(UserRoute, { method: "GET" }).then(res => res.json())
        expect(users).toBeInstanceOf(Array)
        expect(users).lengthOf(3)
        expect(users.at(-1)).toHaveProperty('id',3)
    })
    it('Deve criar um usuário baseado nos dados fornecidos', async () => {
        const methods = await getMethos()
        expect(methods).toContain("POST")
        const createdUser = await fetch(UserRoute, { method: "POST", body:JSON.stringify(testUser), headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
        expect(createdUser).toEqual(testUser)
        const users = await fetch(UserRoute, { method: "GET" }).then(res => res.json())
        expect(users).toBeInstanceOf(Array)
        expect(users).lengthOf(4)
        expect((users as User[]).at(-1)).toEqual(testUser)
        
    })
    it('Deve listar o usuário criado', async () => {
        const users = await fetch(UserRoute, { method: "GET" }).then(res => res.json())
        expect(users).toBeInstanceOf(Array)
        expect(users).lengthOf(4)
        expect(users.at(-1)).toEqual(testUser)
    })


});
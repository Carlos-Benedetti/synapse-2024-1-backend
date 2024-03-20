/**
 * 
 * 
 * 
 * 
 *  NÃO MODIFICAR
 *  by Carlos
 * 
 * 
 * 
 * 
 * 
 */
import { beforeEach, describe, expect, it } from 'vitest'
import { User } from '../models/user.model'

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

describe('Ações de rota de usuario', () => {
    beforeEach(async () => {
        await import('../server')
    })
    it('Deve buscar todos os usuarios', async () => {
        const methods = await getMethos()
        expect(methods).toContain("GET")
        const res = await fetch(UserRoute, { method: "GET" }).then(res => res.json())
        expect(res).toBeInstanceOf(Array)
        expect(res).lengthOf(3)
        expect(res[0]).toEqual(new User(1, "joseph", "juseph@gmail.com", "batata"))
    })
    it('Deve criar um usuario', async () => {
        const methods = await getMethos()
        expect(methods).toContain("POST")
        const user = new User(99, 'testname', 'test@test.com', 'testpassword')
        const body = JSON.stringify(user)
        const res = await fetch(UserRoute, { method: "POST", body, headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
        expect(res).toEqual(user)
    })
});
import mysql from 'mysql2/promise'

export async function init() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mercado'
    })
    try {
        await db.connect()
        console.log('conectado ao banco :)')
        return db
    } catch (error) {
        console.error('falha ao connectar ao banco',error)
        throw error
    }
}

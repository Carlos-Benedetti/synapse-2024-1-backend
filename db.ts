import mysql from 'mysql2/promise';

async function init() {
    const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mercado"
    });

    await db.connect();
    console.log("Connected!");
    return db
}


export default init
import express, { Router, json } from 'express'
import { userRoute } from './routes/user.route'
import { init } from './db'

const app = express()
app.use(json())
app.use(userRoute)

init().then(async db => {
    app.listen(8080, () => { console.log("API aberta em 8080") })
    const [result] = await db.query('SELECT * FROM usuarios')
    console.log(result)
})

import express, { Router, json } from 'express'
import { init } from './db'
import { UserRoute } from './routes/user.route'

const app = express()
app.use(json())

init().then(async db => {
    const userRouter = new UserRoute(app,db)
    app.listen(8080, () => { console.log("API aberta em 8080") })
})

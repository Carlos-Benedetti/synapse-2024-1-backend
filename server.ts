import express, { Router, json } from 'express'
import { userRoute } from './routes/user.route'
import { init } from './db'

const app = express()
app.use(json())


init().then(async db => {
    app.use(userRoute(db))
    app.listen(3000, () => { console.log("API aberta em 8080") })
})

import express, { Router, json } from 'express'
import { userRoute } from './routes/user.route'

const app = express()
app.use(json())
app.use(userRoute)

app.listen(8080, () => { console.log("API aberta em 8080") })
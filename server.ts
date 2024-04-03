import express, { Router, json } from 'express'
import { userRoute } from './routes/user.route'
import { UserRepository } from './models/repositories/user'
import init from './db'

const app = express()
app.use(json())
app.use(userRoute)

init().then(db => {
    const userRepository = new UserRepository(db)
    userRepository.getAll()
    app.listen(8080, () => { console.log("API aberta em 8080") })
})


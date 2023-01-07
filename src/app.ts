import dotenv from "dotenv"
import express, { json } from "express"
import mongoose from "mongoose"

import { createUser, login } from "./controllers/user"
import { userRouter } from "./routes/user"
import { cardRouter } from "./routes/card"
import { fakeAuth } from "./middlewares/fakeAuth"
import { erroeHandler } from "./middlewares/errorHandler"
import { auth } from "./middlewares/auth"

import { createInterface } from "readline"

dotenv.config()
const readLine = createInterface({
   input: process.stdin,
   output: process.stdout
})

const { PORT = 3000, URL_DB = "mongodb://127.0.0.1:27017/mestodb" } = process.env
mongoose.set("strictQuery", true)
mongoose.connect(URL_DB)

const app = express()

app.use(json())
app.use(fakeAuth)

app.post("/signin", login)
app.post("/signup", createUser)

app.use(auth)
app.use("/cards", cardRouter)
app.use("/users", userRouter)
app.use(erroeHandler)

app.listen(PORT, () => {
   readLine.write(`без ошибок, полёт нормальный на порту ${PORT}`)
})

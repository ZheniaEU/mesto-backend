import { PORT, URL_DB } from "./config/config"

import express, { json } from "express"
import mongoose from "mongoose"
import { errors } from "celebrate"

import { createUser, login } from "./controllers/user"
import { userRouter } from "./routes/user"
import { cardRouter } from "./routes/card"
import { errorLogger, requestLogger } from "./middlewares/logger"
import { erroeHandler } from "./middlewares/errorHandler"
import { auth } from "./middlewares/auth"
import { validateCrateUser, validateLogin } from "./utils/validators"

import { createInterface } from "readline"

const readLine = createInterface({
   input: process.stdin,
   output: process.stdout
})

mongoose.set("strictQuery", true)
mongoose.connect(URL_DB!)

const app = express()

app.use(json())

app.use(requestLogger)

app.post("/signup", validateCrateUser, createUser)
app.post("/signin", validateLogin, login)

app.use(auth)
app.use("/cards", cardRouter)
app.use("/users", userRouter)

app.use(errorLogger)
app.use(errors())
app.use(erroeHandler)

app.listen(PORT, () => {
   console.log(`без ошибок, полёт нормальный на порту ${PORT}`)
})

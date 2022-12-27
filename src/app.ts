/* eslint-disable*/
import express, { json } from "express"
import mongoose from "mongoose"

import { userRouter } from "./routes/user"
import { fakeAuth } from "./middlewares/fakeAuth"

const { PORT = 2999 } = process.env
mongoose.set("strictQuery", true)
mongoose.connect("mongodb://127.0.0.1:27017/mestodb")

const app = express()

app.use(json())
app.use(fakeAuth)

// юзер
app.use("/users", userRouter)

app.listen(PORT, () => {
   console.log(`без ошибок, полёт нормальный на порту ${PORT}`)
})

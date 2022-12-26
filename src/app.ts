/*eslint-disable*/
import express, { json, Request, Response, Router } from "express"
import mongoose from "mongoose"
import { createInterface } from "readline"
import { router as userRouter } from "./routes/user"
import { ObjectId } from "mongoose"

declare global {
   namespace Express {
      interface Request {
         user: { _id: string | ObjectId }
      }
   }
}

const { PORT = 2999 } = process.env
mongoose.set("strictQuery", true)
mongoose.connect("mongodb://127.0.0.1:27017/mestodb")

const app = express()

app.use(json())

// это мидлвар
// Он добавляет в каждый запрос объект user. Берите из него идентификатор пользователя в контроллере создания карточки:
app.use((req, res, next) => {

   req.user = {
      _id: "63a925a6e3be325ccc549068" // вставьте сюда _id созданного в предыдущем пункте пользователя
   }

   next()
})

// юзер
app.use("/users", userRouter)

app.listen(PORT, () => {
   console.log(`без ошибок, полёт нормальный`)
})

/*eslint-disable*/
import express, { json, Request, Response, Router } from "express"
import mongoose from "mongoose"
import { createInterface } from "readline"
import router from "./routes/user"

const { PORT = 2999 } = process.env
mongoose.set("strictQuery", true)
mongoose.connect("mongodb://127.0.0.1:27017/mestodb")

const app = express()

app.use(json())

app.use((req, res, next) => {
   req.user = {
      _id: "63a925a6e3be325ccc549068" // вставьте сюда _id созданного в предыдущем пункте пользователя
   }

   next()
})
// юзер
app.use(router)

app.listen(PORT, () => {
   console.log(`без ошибок, полёт нормальный`)
})


// const readLine = createInterface({
//    input: process.stdin,
//    output: process.stdout
// })

// app.listen(PORT, () => {
//    readLine.write(`без ошибок, полёт нормальный`)
// })

// router.get("/users", (req: Request, res: Response) => {

//    User.find({})
//       .then(users => {
//          res.status(200).send(users)
//       })
//       .catch(e => {
//          res.status(500).send({ message: "500ка" })
//       })
// })

// router.post("/users", (req: Request, res: Response) => {

//    console.log(req.body)

//    User.create(req.body)
//       .then((newUser) => {
//          res.status(200).send(newUser)
//       })
//       .catch((e) => {
//          res.status(500).send({ message: "500ка" })
//       })
// })

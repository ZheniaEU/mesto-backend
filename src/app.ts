/*eslint-disable*/
import express, { json, Request, Response, Router } from "express"
import { modelUser as User } from "./models/user"
import mongoose from "mongoose"
import { createInterface } from "readline"

const readLine = createInterface({
   input: process.stdin,
   output: process.stdout
})

const { PORT = 2999  } = process.env
mongoose.set("strictQuery", true)
mongoose.connect("mongodb://127.0.0.1:27017/mestodb")

const app = express()
const router = Router()

router.get("/users", (req: Request, res: Response) => {

   User.find({})
      .then(users => {
         res.status(200).send(users)
      })
      .catch(e => {
         res.status(500).send({ message: "500ка" })
      })
})

router.post("/users", (req: Request, res: Response) => {

   User.create(req.body)
      .then((newUser) => {
         res.status(200).send(newUser)
      })
      .catch((e) => {
         res.status(500).send({ message: "500ка" })
      })
})

app.use(json())
app.use(router)

app.listen(PORT, () => {
   readLine.write(`без ошибок, полёт нормальный`)
})

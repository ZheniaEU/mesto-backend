/* eslint-disable */
import express, { json, Request, Response, Router } from "express"
//import path from "path"
//import { users as db } from "./db"
import mongoose, { model, Schema } from "mongoose"
import type { Users } from "./db"


const { PORT = 2999, MONGO_URL = "mongodb://127.0.0.1:27017/mestodb" } = process.env
mongoose.set("strictQuery", false)
mongoose.connect("mongodb://127.0.0.1:27017/mestodb")
//mongoose.connect(process.env.MONGO_URL)

type IUser = {
   _id: string
   name: string
   avatar: string
}

const app = express()
const router = Router()

const userSchema = new Schema({
   name: {
      type: String,
      require: true
   },
   avatar: {
      type: String,
      require: true
   }
})

const UserModel = mongoose.model<IUser>("users", userSchema)


router.get("/users", (req: Request, res: Response) => {
   UserModel.find({})
      .then(users => {
         res.status(200).send(users)
      })
      .catch(e => {
         res.status(500).send({ message: "500ка" })
      })
   //   res.status(200).send(db)
})

router.post("/users", (req: Request, res: Response) => {
   console.log(req.body)
   UserModel
      .create(req.body)
      .then(newUser => {
         res.status(200).send(newUser)
      })
      .catch(e => {
         res.status(500).send({ message: "500ка" })
      })
})

// router.post("/users/:id", (req: Request, res: Response) => {

//    try {
//       const { id } = req.params
//       const newUser = { ...req.body, id }

//       db.push(newUser)
//       res.status(201).send({ status: "проверка добавления" })
//    } catch {
//       res.status(500).send({ message: "у нас проблемы с добовлением" })
//    }
// })

app.use(json())
app.use(router)

//app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, () => {
   console.log("Слухаем на порту", PORT)
})

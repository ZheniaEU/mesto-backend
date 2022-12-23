import express, { Request, Response, Router, json } from "express"

import path from "path"

import { users } from "./db"

const { PORT = 3000 } = process.env

const app = express()

app.use(json())

const router = Router()

router.get("/users", (req: Request, res: Response) => {
   res.status(200).send(users)
})

router.post("/users/:id", (req: Request, res: Response) => {

   try {
      const { id } = req.params

      const newUser = { ...req.body, id }

      users.push(newUser)
      res.status(201).send({ status: "проверка добавления" })
   } catch (e) {
      res.status(500).send({ message: "у нас проблемы с добовлением" })
   }
})

app.use(router)

app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, () => { })

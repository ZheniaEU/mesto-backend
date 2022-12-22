import express, { Response, Request } from "express"
import path from "path"
import mongoose from "mongoose"

const { PORT = 3000, BASE_PATH } = process.env

const app = express()








app.use(express.static(path.join(__dirname, "public")))
app.listen(PORT, () => {
   console.log("Ссылка на сервер:")
   console.log(BASE_PATH)
})

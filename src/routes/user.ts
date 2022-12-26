import { Router } from "express"
import { createUser, getUsers, getUsersByID } from "../controllers/user"

export const router = Router()

// запрос на всех юзеров
router.get("/", getUsers)
router.get("/", getUsersByID)

// запрос на создания юзера
router.post("/", createUser)

// app.use("/users", createUser)
// app.use("/users", getUsers)
// app.use("/users", getUsersByID)

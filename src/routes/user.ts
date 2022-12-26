import { Router } from "express"
import { createUser, getUsers, getUsersByID } from "../controllers/user"

const router = Router()

// запрос на всех юзеров
router.get("/users", getUsers)
router.get("/", getUsersByID)

// запрос на создания юзера
router.post("/users", createUser)

export default router

// app.use("/users", createUser)
// app.use("/users", getUsers)
// app.use("/users", getUsersByID)

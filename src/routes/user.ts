import { Router } from "express"
import { createUser, getUsers, getUsersByID } from "../controllers/user"

export const userRouter = Router()

// запрос на всех юзеров
userRouter.get("/", getUsers)
userRouter.get("/", getUsersByID)

// запрос на создания юзера
userRouter.post("/", createUser)

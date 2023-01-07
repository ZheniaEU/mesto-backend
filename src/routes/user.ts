import { Router } from "express"
import { createUser, getUser, getUsers, getUsersByID, updateAvatar, updateUser } from "../controllers/user"

export const userRouter = Router()

userRouter.get("/me", getUser)
userRouter.get("/", getUsers)
userRouter.get("/:userId", getUsersByID)


// userRouter.post("/", createUser)
userRouter.put("/me", updateUser)
userRouter.put("/me/avatar", updateAvatar)

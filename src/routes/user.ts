import { validateUsersByID } from "../utils/validators"
import { Router } from "express"
import { getUser, getUsers, getUsersByID, updateAvatar, updateUser } from "../controllers/user"

export const userRouter = Router()

userRouter.get("/me", getUser)
userRouter.get("/", getUsers)
userRouter.get("/:userId", validateUsersByID, getUsersByID)

userRouter.put("/me", updateUser)
userRouter.put("/me/avatar", updateAvatar)

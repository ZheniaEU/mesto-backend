import { Router } from "express"
import { validateUpdateAvatar, validateUpdateUser, validateUsersByID } from "../utils/validators"
import { getUser, getUsers, getUsersByID, updateAvatar, updateUser } from "../controllers/user"

export const userRouter = Router()

userRouter.get("/me", getUser)
userRouter.get("/", getUsers)
userRouter.get("/:userId", validateUsersByID, getUsersByID)

userRouter.patch("/me", validateUpdateUser, updateUser)
userRouter.patch("/me/avatar", validateUpdateAvatar, updateAvatar)

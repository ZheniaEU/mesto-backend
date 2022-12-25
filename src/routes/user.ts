/* eslint-disable*/
import express, { json, Request, Response, Router } from "express"
import { createUser, getUsers, getUsersByID } from "../controllers/user"


const app = express()
const router = Router()
// роутер юзара

// app.use("/users", createUser)
// app.use("/users", getUsers)
// app.use("/users", getUsersByID)

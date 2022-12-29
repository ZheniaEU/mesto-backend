import { modelUser as User } from "../models/user"

import type { Request, Response } from "express"

export const getUsers = (_: Request, res: Response) => {

   User.find({})
      .then((users) => res.status(200).send({ data: users }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка getUsers" }))
}

export const getUsersByID = (_: Request, res: Response) => {

   User.findById({})
      .then((user) => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка getUsersByID" }))
}

export const createUser = (req: Request, res: Response) => {

   User.create(req.body)
      .then((newUser) => res.status(200).send({ data: newUser }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка createUser" }))
}

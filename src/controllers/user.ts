import { modelUser as User } from "../models/user"

import type { Request, Response } from "express"


export const getUsers = async (_: Request, res: Response) => {

   await User.find({})
      .then((users) => res.status(200).send({ data: users }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка getUsers" }))
}

export const getUsersByID = async (_: Request, res: Response) => {

   await User.findById({})
      .then((user) => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка getUsersByID" }))
}

export const createUser = async (req: Request, res: Response) => {

   await User.create(req.body)
      .then((newUser) => res.status(200).send({ data: newUser }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка createUser" }))
}

// Создайте контроллеры и роуты для пользователей
// Реализуйте три роута:
// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя

// В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.

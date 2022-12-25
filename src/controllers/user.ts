import { Request, Response } from "express"
import { modelUser as User } from "../models/user"

export const getFilms = (req: Request, res: Response) => {
   return User.find({})
      .then((films) => res.send({ data: films }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }))
}

export const createFilm = (req: Request, res: Response) => {
   const { title, genre } = req.body

   return User.create({ title, genre })
      .then((film) => res.send({ data: film }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }))
}

// Создайте контроллеры и роуты для пользователей
// Реализуйте три роута:
// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя

// В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.

import { modelUser as User } from "../models/user"

import type { Request, Response } from "express"

export const getUsers = (_: Request, res: Response) => {

   User.find({})
      .then((users) => res.status(200).send({ data: users }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка getUsers" }))
}

export const getUsersByID = (req: Request, res: Response) => {

   User.findById(req.params.userId)
      .then((user) => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка getUsersByID" }))
}

export const createUser = (req: Request, res: Response) => {

   User.create(req.body)
      .then((newUser) => res.status(200).send({ data: newUser }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка createUser" }))
}

export const updateUser = (req: Request, res: Response) => {

   const { name, about } = req.body

   User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка: updateUser" }))
}

export const updateAvatar = (req: Request, res: Response) => {

   User.findByIdAndUpdate(req.user._id, req.body.avatar, { new: true, runValidators: true })
      .then((user) => res.status(200).send({ data: user }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка: updateAvatar" }))
}

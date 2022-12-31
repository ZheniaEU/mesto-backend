import { modelUser as User } from "../models/user"

import type { NextFunction, Request, Response } from "express"

export const getUsers = (_: Request, res: Response, next: NextFunction) => {

   User.find({})
      .then((users) => res.status(200).send({ data: users }))
      .catch((err) => next(err))
}

export const getUsersByID = (req: Request, res: Response, next: NextFunction) => {

   User.findById(req.params.userId)
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => next(err))
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {

   User.create(req.body)
      .then((newUser) => res.status(200).send({ data: newUser }))
      .catch((err) => next(err))
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {

   const { name, about } = req.body

   User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => next(err))
}

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {

   User.findByIdAndUpdate(req.user._id, req.body.avatar, { new: true, runValidators: true })
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => next(err))
}

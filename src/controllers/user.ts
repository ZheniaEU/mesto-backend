import { JWT_SECRET } from "../config/config"

import { modelUser as User } from "../models/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import type { Request, Response, NextFunction } from "express"
import { badRequestError, conflictError } from "../utils/errors"

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

   const { email, password, name, avatar, about } = req.body

   return bcrypt.hash(password, 10)
      .then((hash: string) => User.create({ email, password: hash, name, avatar, about }))
      .then((user) => {
         res.status(201).send({
            data: {
               email: user.email,
               name: user.name,
               about: user.about,
               avatar: user.avatar,
               token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" })
            }
         })
      })
      .catch((err) => {
         if (err.code === 11000) {
            next(conflictError("Пользователь c такой почтой уже существует"))
         }
         if (err.name === "ValidationError") {
            next(badRequestError(err.errors?.email?.properties?.message || "Данные введены не правильно"))
         }
         next(err)
      })
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {

   User.findById(req.user._id)
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => next(err))
}

export const getUsers = (_: Request, res: Response, next: NextFunction) => {

   User.find({})
      .then((users) => res.status(200).send({ data: users }))
      .catch((err) => next(err))
}

export const getUsersByID = (req: Request, res: Response, next: NextFunction) => {

   User.findById(req.params.userId)
      .then((user) => { res.status(200).send({ data: user }) })
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

export const login = (req: Request, res: Response) => {

   const { email, password } = req.body

   User.findUserByCredentials(email, password)
      .then((user) => {

         const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" })

         res.status(200).send({ token })
         //  res.cookie("jwt", token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true })
      })
      .catch((err) => { res.status(401).send({ message: err.message }) })
}

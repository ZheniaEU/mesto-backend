import { modelUser as User } from "../models/user"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import type { NextFunction, Request, Response } from "express"

dotenv.config()

const { JWT_SECRET = "secret" } = process.env

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

//! дописать
// export const createUser = (req: Request, res: Response, next: NextFunction) => {
export const createUser = async (req: Request, res: Response) => {

   const { email, password, name, avatar, about } = req.body

   return bcrypt.hash(password, 10)
      .then((hash: string) => User.create({ email, password: hash, name, avatar, about }))
      .then((user) => { res.status(201).send({ data: user }) })
      .catch((err) => { res.status(400).send(err) })
   // User.create(req.body)
   //    .then((newUser) => res.status(200).send({ data: newUser }))
   //    .catch((err) => next(err))
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

// ? чё с мидлваром? он нам нужен?
export const login = (req: Request, res: Response) => {

   const { email, password } = req.body

   User.findUserByCredentials(email, password)
      .then((user) => {

         const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" })

         res.status(200).send({ token })
      })
      .catch((err) => { res.status(401).send({ message: err.message }) })
}

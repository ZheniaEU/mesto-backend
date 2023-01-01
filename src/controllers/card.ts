import { modelCard as Card } from "../models/card"

import type { NextFunction, Request, Response } from "express"

export const getCards = (_: Request, res: Response, next: NextFunction) => {

   Card.find({})
      .then((cards) => res.status(200).send({ data: cards }))
      .catch((err) => next(err))
}

export const crateCard = (req: Request, res: Response, next: NextFunction) => {

   const { body: { name, link }, user: { _id } } = req

   Card.create({ name, link, owner: _id })
      .then((card) => res.status(200).send({ data: card }))
      .catch((err) => next(err))
}

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {

   Card.findById(req.params.cardId)
      .then((card) => res.status(200).send({ data: card }))
      .catch((err) => next(err))
}

export const setLike = (req: Request, res: Response, next: NextFunction) => {

   Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => res.status(200).send({ data: card }))
      .catch((err) => next(err))
}

export const removeLike = (req: Request, res: Response, next: NextFunction) => {

   Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .then((card) => res.status(200).send({ data: card }))
      .catch((err) => next(err))
}

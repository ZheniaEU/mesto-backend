import { modelCard as Card } from "../models/card"

import type { NextFunction, Request, Response } from "express"
import { forbiddenError, notFoundError } from "../utils/errors"

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

//! не оттестирована, так же нужно дописать
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {

   const { cardId } = req.params

   Card.findById(cardId)
      .then((card) => {
         if (!card) {
            throw notFoundError("Карточка не найдена")
         }
         if (`${card.owner}` !== req.user._id) {
            throw forbiddenError("Недостаточно прав для удаления карточки")
         }
         return Card.findByIdAndDelete(cardId)
      })
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

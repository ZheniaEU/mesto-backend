import { modelCard as Card } from "../models/card"

import type { Request, Response } from "express"

export const getCards = (_: Request, res: Response) => {

   Card.find({})
      .then((cards) => res.status(200).send({ data: cards }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка: getCards" }))
}

export const crateCard = (req: Request, res: Response) => {

   const { body: { name, link }, user: { _id } } = req

   Card.create({ name, link, owner: _id })
      .then((card) => res.status(200).send({ data: card }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка: crateCard" }))
}

export const deleteCard = (req: Request, res: Response) => {

   Card.findById(req.params.cardId)
      .then((card) => res.status(200).send({ data: card }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка: deleteCard" }))
}

export const setLike = (req: Request, res: Response) => {

   Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => res.status(200).send({ data: card }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка: setLike" }))
}

export const removeLike = (req: Request, res: Response) => {

   Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .then((card) => res.status(200).send({ data: card }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка: removeLike" }))
}

/* eslint-disable*/
import { modelCard as Card } from "../models/card"

import type { Request, Response } from "express"

export const getCards = (_: Request, res: Response) => {

   Card.find({})
      .then((cards) => res.status(200).send({ data: cards }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка getCards" }))
}

export const crateCard = (req: Request, res: Response) => {

   const { body: { name, link }, user: { _id } } = req

   Card.create({ name, link, owner: _id })
      .then((card) => res.status(200).send({ data: card }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка crateCard" }))
}

export const deleteCard = (req: Request, res: Response) => {

   const { params: { cardId }, user: { _id } } = req

   Card.findById(cardId)
      .then(card => {
         if (card && card.owner === _id) {
            return Card.findByIdAndDelete({})
               .then((card) => res.status(200).send({ data: card }))
               .catch(() => res.status(500).send({ message: "Произошла ошибка deleteCard" }))

         }
         res.status(403).send({ message: "Произошла ошибка deleteCard" })
      })
      .catch(() => res.status(500).send({ message: "Произошла ошибка deleteCard" }))
}
// Создайте контроллеры и роуты для карточек
// Реализуйте три роута:

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору

// В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.

// Другие роуты карточек и пользователя
// Реализуйте ещё четыре роута:
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

// В каждом роуте понадобится _id пользователя, совершающего операцию. Получайте его из req.user._id.
// Каждый пользователь может поставить только один лайк карточке. Поэтому массив лайков должен состоять из уникальных значений.
// Для этого нужно добавлять пользователя в массив, только если его там ещё нет. В MongoDB такая логика реализуется специальными операторами:
// $addToSet, чтобы добавить элемент в массив, если его там ещё нет;
// $pull, чтобы убрать.
// const likeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//   { new: true },
// )

// const dislikeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $pull: { likes: req.user._id } }, // убрать _id из массива
//   { new: true },
// )

// // Экспортируем методы контроллера
// export likeCard;
// export dislikeCard;

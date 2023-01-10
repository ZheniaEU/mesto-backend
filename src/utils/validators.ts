import { celebrate, Joi } from "celebrate"
import { emailValidation } from "./constants"

export const validateCrateUser = celebrate({
   body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2 }),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).default("Жак-Ив Кусто"),
      about: Joi.string().min(2).max(200).default("Исследователь"),
      avatar: Joi.string().default("https://i.imgur.com/kRb04H3.jpg")
   }).unknown(true)
})

export const validateLogin = celebrate({
   body: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).pattern(emailValidation).message("крайне стрёмная шляпа, тянущая за собой 1000зависимостей, никогда бы её у себя на проекте не использовал"),
      password: Joi.string().required()
   }).unknown(true)
})

export const validateUsersByID = celebrate({
   params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required()
   })
})

export const validateUpdateUser = celebrate({
   body: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().required()
   }).unknown(true)
})

export const validateUpdateAvatar = celebrate({
   body: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().required()
   }).unknown(true)
})

/*
cardRouter.post("/", getCards)
cardRouter.delete("/:cardId", deleteCard)
cardRouter.put("/:cardId/likes", setLike)
cardRouter.delete("/:cardId/likes", removeLike)
*/

/* https://snipboard.io/WZz1Ne.jpg Прошу добавить joi/celebrate валидацию для всех
роутов кроме GET \users и GET /cards и GET /users/me также при валидации id необходимо
валидировать ObjectID не просто как последовательность символов длиной 24 символа, а как hex
последовательность длиной 24 символа (благо у Joi есть встроенный hex-валидатор). Удаление карточки
 по id test4583q0d2574b5862test или другому инвалидному не должно передаваться контроллеру. celebrate
  должен заворачивать такие запросы до передачи их контроллеру. */

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

import { celebrate, Joi } from "celebrate"
import { emailValidation, imageValidation, passwordValidation } from "./constants"

export const validateCrateUser = celebrate({
   body: Joi.object().keys({
      email: Joi.string().required().regex(emailValidation).message("Ваша почта не подходит"),
      password: Joi.string().required().regex(passwordValidation)
         .message("Пароль должен быть от 8 до 16 символов. А так же как минимум содержать одну заглавную букву, цифру и спецсимвол"),
      name: Joi.string().min(2).max(30).default("Жак-Ив Кусто"),
      about: Joi.string().min(2).max(200).default("Исследователь"),
      avatar: Joi.string().default("https://i.imgur.com/kRb04H3.jpg")
   })
})

// и тут подкралась засада, если старая маска пароля в постмане не удволетворяет запрос, придётся создать нового пользователя с верной маской:)
export const validateLogin = celebrate({
   body: Joi.object().keys({
      email: Joi.string().required().regex(emailValidation).message("Неверная почта или пароль"),
      password: Joi.string().required().regex(passwordValidation).message("Неверная почта или пароль")
   })
})

export const validateUsersByID = celebrate({
   params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required()
   })
})

export const validateUpdateUser = celebrate({
   body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().regex(imageValidation).message("не корректная ссылка на изображение")
   })
})

export const validateUpdateAvatar = celebrate({
   body: Joi.object().keys({
      avatar: Joi.string().regex(imageValidation).message("не корректная ссылка на изображение")
   })
})

export const validateIdCard = celebrate({
   params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required()
   })
})

export const validateCrateCard = celebrate({
   body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().uri().regex(imageValidation).message("не корректная ссылка на изображение")
   })
})

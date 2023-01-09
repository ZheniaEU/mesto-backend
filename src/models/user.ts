import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

import type { User, UserModel } from "../utils/types"
import { emailValidation, imageValidation } from "../utils/constants"

const userSchema = new Schema<User, UserModel>({
   email: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: (str: string) => emailValidation.test(str),
         message: "Ваша почта не подходит"
      }
   },
   password: {
      type: String,
      required: true,
      select: false
   },
   name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто"
   },
   about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: "Исследователь"
   },
   avatar: {
      type: String,
      default: "https://i.imgur.com/kRb04H3.jpg",
      validate: {
         validator: (str: string) => imageValidation.test(str)
      },
      message: "неподходящая ссылка"
   }
})

userSchema.static("findUserByCredentials", function findUserByCredentials(email: string, password: string) {
   return this.findOne({ email }).select("+password")
      .then((user) => {
         if (!user) {
            return Promise.reject(new Error("Неправильные почта или пароль"))
         }

         return bcrypt
            .compare(password, user.password)
            .then((matched) => {
               if (!matched) {
                  return Promise.reject(new Error("Неправильные почта или пароль"))
               }

               return user
            })
      })
})

export const modelUser = model<User, UserModel>("user", userSchema)

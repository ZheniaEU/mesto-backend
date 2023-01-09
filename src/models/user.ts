import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

import type { User, UserModel } from "../utils/types"

const userSchema = new Schema<User, UserModel>({
   email: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: (str: string) => /^[^.](?=[a-z\d!#$%&'*+\-\\/=?.^_`{}|~]+@([a-z-.\d]+\.)+[a-z]{2,}$)((?!\.\.).)*$/i.test(str),
         message: "Ваша почта не подходит"
      }
   },
   password: {
      type: String,
      required: true,
      select: false
      // validate: {
      //    validator: (str: string) => !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-zA-Z\d#?!@$%^&*-]{8,16}$/.test(str),
      // message: "Пароль должен быть от 8 до 16 символов. А так же как минимум содержать одну заглавную букву, цифру, а так же спец символ"
      // },
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
         validator: (str: string) => /^https:\/\/([^\s(["<,>/]*)(\/)[^\s[",><]*\.(png|jpg|jpeg|bmp)(\?[^\s[",><]*)?/g.test(str)
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

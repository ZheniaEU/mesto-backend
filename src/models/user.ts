import { model, Schema } from "mongoose"

export type User = {
   email: string
   password: string
   name: string
   about: string
   avatar: string
}

const userSchema = new Schema<User>({
   email: {
      type: String,
      unique: true,
      validate: {
         validator: (str: string) => /^[^.](?=[a-z\d!#$%&'*+\-\\/=?.^_`{}|~]+@([a-z-.\d]+\.)+[a-z]{2,}$)((?!\.\.).)*$/i.test(str)
      },
      message: "Ваша почта не подходит"
   },
   password: {
      type: String,
      validate: {
         validator: (str: string) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])[a-zA-Z\d#?!@$%^&*-]{8,16}$/.test(str)
      },
      message: "Пароль должен быть от 8 до 16 символов. А так же как минимум содержать одну заглавную букву, цифру, а так де спец символ"
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

export const modelUser = model<User>("user", userSchema)

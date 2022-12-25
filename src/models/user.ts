import { model, Schema } from "mongoose"

export type User = {
   name: string
   about: string
   avatar: string
}

const userSchema = new Schema<User>({
   name: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 30
   },
   about: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 200
   },
   avatar: {
      type: String,
      require: true,
      validate: {
         validator: (str: string) => {
            /^https:\/\/([^\s(["<,>/]*)(\/)[^\s[",><]*\.(png|jpg|jpeg|bmp)(\?[^\s[",><]*)?/g.test(str)
         }
      },
      message: "нишмогла, ну не прокатило"
   }
})

// Данила нужно ли нам типизировать вот эту вот шляпу? а так же экспорт по умолчанию щито?
// Данила где дока по регам?
export const modelUser = model<User>("users", userSchema)

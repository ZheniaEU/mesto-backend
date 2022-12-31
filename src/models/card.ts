import { model, Schema } from "mongoose"

type Card = {
   name: string
   link: string
   owner: Schema.Types.ObjectId
   likes: Array<Schema.Types.ObjectId>
   createdAt: Date
}

const userSchema = new Schema<Card>({
   name: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 30
   },
   link: {
      type: String,
      require: true,
      validate: {
         validator: (str: string) => /^https:\/\/([^\s(["<,>/]*)(\/)[^\s[",><]*\.(png|jpg|jpeg|bmp)(\?[^\s[",><]*)?/g.test(str)
      },
      message: "неподходящая ссылка"
   },
   owner: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "user"
   },
   likes: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: []
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

export const modelCard = model<Card>("card", userSchema)

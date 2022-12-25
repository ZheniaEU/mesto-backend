import { model, Schema } from "mongoose"

type Card = {
   name: string
   link: string
   owner: Schema.Types.ObjectId
   likes: Array<Schema.Types.ObjectId>
   createdAt: Date
}

const userSchema = new Schema({
   name: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 30
   },
   link: {
      type: String,
      require: true
   },
   owner: {
      type: Schema.Types.ObjectId,
      require: true
   },
   likes: {
      type: Schema.Types.ObjectId,
      ref: "users",
      default: []
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

export const modelCard = model<Card>("cards", userSchema)

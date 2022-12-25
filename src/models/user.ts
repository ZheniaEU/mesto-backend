import { model, Schema } from "mongoose"

export type TUser = {
   _id: string
   name: string
   avatar: string
}

const userSchema = new Schema({
   name: {
      type: String,
      require: true
   },
   avatar: {
      type: String,
      require: true
   }
})

export const modelUser = model<TUser>("users", userSchema)

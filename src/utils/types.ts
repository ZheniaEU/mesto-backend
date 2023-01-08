import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"
import { Document, Model, ObjectId, Schema } from "mongoose"

export type Card = {
   name: string
   link: string
   owner: Schema.Types.ObjectId
   likes: Array<Schema.Types.ObjectId>
   createdAt: Date
}

export type User = {
   email: string
   password: string
   name: string
   about: string
   avatar: string
}

export type UserModel = {
   findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, User>>
} & Model<User>

export type AuthorizationRequest = {
   user: string | JwtPayload
} & Request

export type UserPayload = {
   _id: ObjectId
}

export type ErrorHandler = {
   statusCode: number
} & Error

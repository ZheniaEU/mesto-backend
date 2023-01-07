import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ObjectId } from "mongoose"

type SessionRequest = {
   user: string | JwtPayload
} & Request

type UserPayload = {
   _id: ObjectId
}

const handleAuthError = (res: Response) => {
   res.status(401).send({ message: "Необходима авторизация" })
}

const extractBearerToken = (header: string) => {
   return header.replace("Bearer ", "")
}

export const auth = (req: SessionRequest, res: Response, next: NextFunction) => {

   const { authorization } = req.headers

   console.log(authorization)

   if (!authorization || !authorization.startsWith("Bearer ")) {
      return handleAuthError(res)
   }

   const token = extractBearerToken(authorization)
   let payload

   try {
      payload = jwt.verify(token, "secret") as UserPayload
   } catch (err) {
      return handleAuthError(res)
   }

   req.user = payload

   next()
}

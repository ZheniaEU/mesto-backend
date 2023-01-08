import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import type { AuthorizationRequest, UserPayload } from "../utils/types"

const handleAuthError = (res: Response) => {
   res.status(401).send({ message: "Необходима авторизация" })
}

const extractBearerToken = (header: string) => {
   return header.replace("Bearer ", "")
}

export const auth = (req: AuthorizationRequest, res: Response, next: NextFunction) => {

   const { authorization } = req.headers

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

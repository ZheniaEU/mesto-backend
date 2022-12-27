/* eslint-disable */
import { ObjectId } from "mongoose"

import type { Request, Response, NextFunction } from "express"

declare global {
   namespace Express {
      interface Request {
         user: { _id: string | ObjectId }
      }
   }
}

export const fakeAuth = (req: Request, _: Response, next: NextFunction) => {

   req.user = {
      _id: "63a925a6e3be325ccc549068"
   }

   next()
}
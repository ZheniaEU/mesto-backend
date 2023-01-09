import { Request, Response } from "express"

import type { ErrorHandler } from "../utils/types"

export const erroeHandler = ((err: ErrorHandler, _: Request, res: Response) => {

   const { statusCode = 500, message } = err

   res.status(statusCode).send({
      message: statusCode === 500 ? "На сервере произошла ошибка" : message
   })
})

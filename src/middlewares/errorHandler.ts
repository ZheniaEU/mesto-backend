import { NextFunction, Request, Response } from "express"


export const erroeHandler = ((_: Request, res: Response, next: NextFunction) => {

   res.status(500).send({ message: "На сервере произошла ошибка" })
   next()
})

import { crateCard, deleteCard, getCards, removeLike, setLike } from "../controllers/card"
import { Router } from "express"

export const cardRouter = Router()

cardRouter.get("/", crateCard)
cardRouter.post("/", getCards)
cardRouter.delete("/:cardId", deleteCard)
cardRouter.put("/:cardId/likes", setLike)
cardRouter.delete("/:cardId/likes", removeLike)

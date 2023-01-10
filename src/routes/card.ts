import { crateCard, deleteCard, getCards, removeLike, setLike } from "../controllers/card"
import { Router } from "express"
import { validateCrateCard, validateIdCard } from "../utils/validators"

export const cardRouter = Router()

cardRouter.post("/", validateCrateCard, crateCard)
cardRouter.get("/", getCards)
cardRouter.delete("/:cardId", validateIdCard, deleteCard)
cardRouter.put("/:cardId/likes", validateIdCard, setLike)
cardRouter.delete("/:cardId/likes", validateIdCard, removeLike)

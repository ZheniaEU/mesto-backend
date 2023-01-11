import dotenv from "dotenv"

dotenv.config()

export const { PORT = 3000, JWT_SECRET = "secret", URL_DB = "mongodb://127.0.0.1:27017/mestodb" } = process.env

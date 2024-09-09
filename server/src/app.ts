import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { appRouter } from "./routes"

import { dotenvConfig } from "./config/dotenvConfig"
dotenvConfig()

export const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true
}))
app.use(cookieParser())

app.use("/api", appRouter);

import { Router } from "express";
import { userRouter } from "./routes/user-routes";

export const appRouter = Router()

appRouter.use("/users", userRouter)

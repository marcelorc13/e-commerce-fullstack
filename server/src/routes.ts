import { Router } from "express";
import Database from "./db/db";
import { RowDataPacket } from "mysql2";
import { userRouter } from "./routes/user-routes";

export const appRouter = Router()

appRouter.use("/users", userRouter)

appRouter.get("/tabelas", async (req, res) => {
    try {
        const db = Database
        const [result] = await db.query<RowDataPacket[]>(`SHOW TABLES FROM e_commerce`)

        res.send(result)
    } catch (err) {
        console.log(err)
        throw err
    }

})

import { Router } from "express"
import UserController from "../controllers/user-controller"

export const userRouter = Router()

userRouter.get("/", UserController.getAllUsers)
userRouter.get("/:id", UserController.getUser)
userRouter.post("/", UserController.createUser)
userRouter.delete("/:id", UserController.deleteUser)
userRouter.put("/:id", UserController.updateUser)


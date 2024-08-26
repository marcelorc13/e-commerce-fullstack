import { Request, Response } from "express";
import userService from "../services/user-service";
import { createUserSchema, updateUserSchema } from "../schemas/user-schema";

class UserController {
    async getAllUsers(req: Request, res: Response) {
        const result = await userService.getAllUsers()
        if (!result) {
            return res.status(404).json({ message: "A tabela de usuários ainda está vazia" })
        }
        res.json(result)
    }

    async getUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const result = await userService.getUser(id)
            if (!result) {
                return res.status(404).json({ message: "Não existe usuário com esse id" })
            }
            return res.json(result)
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }

    }

    async createUser(req: Request, res: Response) {
        try {
            const user = createUserSchema.parse(req.body)
            const result = await userService.addUser(user)

            res.json(result)
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }

    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const result = await userService.deleteUser(id)

            if (!result) {
                return res.status(404).json({ message: "Não existe usuário com esse id" })
            }

            return res.json(result)
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const user = updateUserSchema.parse(req.body)
            const result = await userService.updateUser(user, id)

            if (!result) {
                return res.status(404).json({ message: "Não existe usuário com esse id" })
            }

            return res.json(result)
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }
    }
}

export default new UserController
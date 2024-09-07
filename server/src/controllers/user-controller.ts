import { Request, Response } from "express";
import UserService from "../services/user-service";
import { createUserSchema, loginSchema, updateUserSchema } from "../schemas/user-schema";

class UserController {
    async getAllUsers(req: Request, res: Response) {
        const result = await UserService.getAllUsers()
        if (!result) {
            return res.status(404).json({ message: "A tabela de usuários ainda está vazia" })
        }
        res.json(result)
    }

    async getUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const result = await UserService.getUser(id)
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
            const result = await UserService.addUser(user)

            res.json(result)
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }

    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const result = await UserService.deleteUser(id)

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
            const result = await UserService.updateUser(user, id)

            if (!result) {
                return res.status(404).json({ message: "Não existe usuário com esse id" })
            }

            return res.json(result)
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }
    }

    async logUser(req: Request, res: Response) {
        try {
            const user = req.body
            const result = await UserService.login(user)

            if (!result) {
                return res.status(404).json({ status: 404, message: "Não foi possível encontrar o usuário, Email ou Senha incorretos" })
            }
            return res.status(200).json({ status: 200, message: "Usuário logado com sucesso!" })
        }
        catch (err) {
            return res.status(500).json({ error: err })
        }
    }
}

export default new UserController
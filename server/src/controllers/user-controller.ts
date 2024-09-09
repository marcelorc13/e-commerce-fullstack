import { Request, Response } from "express";
import UserService from "../services/user-service";
import { createUserSchema, loginDTO, loginSchema, updateUserSchema } from "../schemas/user-schema";
import { dotenvConfig } from "../config/dotenvConfig";
import jwt from "jsonwebtoken"
import { CustomResponse } from "../models/response-model";

dotenvConfig()
class UserController {
    async getAllUsers(req: Request, res: Response) {
        const result = await UserService.getAllUsers()
        if (!result) {
            return res.status(404).json(new CustomResponse(404, "A tabela de usuários ainda está vazia"))
        }
        res.status(200).json(new CustomResponse(200, "Lista de todos os usuário do banco de dados", result))
    }

    async getUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const result = await UserService.getUser(id)
            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Usuário não encontrado"))
            }
            return res.status(200).json(new CustomResponse(200, "Informações do usuário", result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }

    }

    async createUser(req: Request, res: Response) {
        try {
            const user = createUserSchema.parse(req.body)
            const result = await UserService.addUser(user)

            res.status(201).json(new CustomResponse(201, "Usuário criado com sucesso!", result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }

    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const result = await UserService.deleteUser(id)

            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Usuário não encontrado"))
            }

            return res.status(200).json(new CustomResponse(200, "Usuário deletado com sucesso!", result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const user = updateUserSchema.parse(req.body)
            const result = await UserService.updateUser(user, id)

            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Usuário não encontrado"))
            }

            return res.status(200).json(new CustomResponse(200, "Usuário editado com sucesso!", result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }
    }

    async logUser(req: Request, res: Response) {
        try {
            const user: loginDTO = req.body
            const result = await UserService.login(user)

            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Não foi possível encontrar o usuário, Email ou Senha incorretos"))
            }

            const secretKey: string = process.env.SECRET_KEY || ""
            const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "1h" })

            res.cookie("Set-Cookie", token, { httpOnly: true })
            return res.status(200).json(new CustomResponse(200, "Usuário logado com sucesso!", result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }
    }
}

export default new UserController
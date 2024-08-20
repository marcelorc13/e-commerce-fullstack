import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";
import { userSchema, userType } from "../models/user";

class UserController {

    async createUser(req: Request, res: Response) {
        try {
            const user: userType = userSchema.parse(req.body)
            const result = await userService.addUser(user)

            res.json(result)
        }
        catch (err) {
            res.json(err)
        }

    }

    async getAllUsers(req: Request, res: Response) {
        const result = await userService.findAllUsers()
        if(!result) {
            return res.status(404).json({message: "A tabela de usuários ainda está vazia"})
        }
        res.json(result)
    }

    async getUser(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id)
            const result = await userService.findUser(id)
            if(!result) {
                return res.status(404).json({message: "Não possui usuário com esse id"})
            }
            return res.json(result)
        }
        catch(err) {
            res.status(500).json({error: err})
        }
        
    }
}

export default new UserController
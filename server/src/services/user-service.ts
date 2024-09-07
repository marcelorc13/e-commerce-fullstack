import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2"
import UserRepository from "../repositories/user-repository"
import { createUserDTO, loginDTO, updateUserDTO, userResponseDTO, } from "../schemas/user-schema"
class UserService {
    async getAllUsers(): Promise<userResponseDTO[] | null> {
        const users = await UserRepository.selectAll()
        if (!users) {
            return null
        }

        return users
    }

    async getUser(id: number): Promise<userResponseDTO | null> {
        const [user] = await UserRepository.select(id)
        if (!user) {
            return null
        }

        return user;
    }

    async addUser(user: createUserDTO): Promise<[ResultSetHeader, FieldPacket[]] | null> {
        const result = await UserRepository.insert(user)
        return result
    }

    async deleteUser(id: number): Promise<[ResultSetHeader, FieldPacket[]] | null> {
        const exists = await this.checkIfUserExist(id)
        if (!exists) {
            return null;
        }
        const result = await UserRepository.delete(id)

        return result
    }

    async updateUser(user: updateUserDTO, id: number): Promise<[ResultSetHeader, FieldPacket[]] | null> {
        const exists = await this.checkIfUserExist(id)
        if (!exists) {
            return null;
        }
        const result = await UserRepository.update(user, id)

        return result
    }

    async checkIfUserExist(id: number): Promise<Boolean> {
        const [user] = await UserRepository.select(id)
        return !!user
    }

    async login(userLogin: loginDTO): Promise<loginDTO | null> {
        const user = await UserRepository.login(userLogin)
        if (user.length == 0) {
            return null
        }
        return user[0]

    }
}

export default new UserService()
import UserRepository from "../repositories/user-repository"
import { createUserType, updateUserType } from "../models/user-models"
class UserService {
    async getAllUsers() {
        const users = await UserRepository.selectAll()
        if (!users) {
            return null
        }

        return users
    }

    async getUser(id: number) {
        const [user] = await UserRepository.select(id)
        if (!user) {
            return null
        }

        return user;
    }

    async addUser(user: createUserType) {
        const result = await UserRepository.insert(user)
        return result
    }

    async deleteUser(id: number) {
        const exists = await this.checkIfUserExist(id)
        if (!exists) {
            return null;
        }
        const result = await UserRepository.delete(id)

        return result
    }

    async updateUser(user: updateUserType, id: number) {
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
}

export default new UserService()
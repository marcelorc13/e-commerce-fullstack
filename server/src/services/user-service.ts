import UserRepository from "../repositories/user-repository"
import { userSchema, userType } from "../models/user"
class UserService {

    async addUser(user: userType) {
        const result = await UserRepository.insertUser(user)
        return result
    }

    async findAllUsers() {
        const [users] = await UserRepository.queryAllUsers()
        if (users.length == 0) {
            return null
        }
        return users
    }

    async findUser(id: number) {
        const [user] = await UserRepository.queryUser(id)
        if (!user) {
            return null
        }
        return user;
    }
}

export default new UserService()
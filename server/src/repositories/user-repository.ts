import Database from "../db/db";
import { userType } from "../models/user";

class UserRepository {

    async insertUser(user: userType) {
        const res = await Database.query(`
            INSERT INTO usuarios(nome, sobrenome, email, senha)
            VALUES(?, ? , ?, ?);
            `, [user.nome, user.sobrenome, user.email, user.senha])

        return(res)
    }

    async queryAllUsers() {
        const res = await Database.query('SELECT * FROM usuarios')
        return res;
    }

    async queryUser(id: number) {
        const [res] = await Database.query(`
            SELECT * FROM usuarios
            WHERE id = ?  
            `, [id])
        return res;
    }
}

export default new UserRepository()
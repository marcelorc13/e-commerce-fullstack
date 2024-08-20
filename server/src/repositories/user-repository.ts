import Database from "../db/db";
import { RowDataPacket } from "mysql2";
import { createUserType, updateUserType } from "../models/user-models";

class UserRepository {
    async selectAll() {
        const [res] = await Database.query<RowDataPacket[]>('SELECT * FROM usuarios')
        return res;
    }


    async select(id: number) {
        const [res] = await Database.query<RowDataPacket[]>(`
            SELECT * FROM usuarios
            WHERE id = ?  
            `, [id])
        return res;
    }

    async insert(user: createUserType) {
        const res = await Database.query(`
            INSERT INTO usuarios(nome, sobrenome, email, senha)
            VALUES(?, ? , ?, ?);
            `, [user.nome, user.sobrenome, user.email, user.senha])

        return (res)
    }

    async delete(id: number) {
        const res = await Database.query(`
            DELETE FROM usuarios
            WHERE id = ?
            `, [id])
        return res
    }

    async update(user: updateUserType, id: number) {
        const res = await Database.query(`
            UPDATE usuarios
            SET nome = ?,
                sobrenome = ?,
                email = ?
            WHERE id = ?
            `, [user.nome, user.sobrenome, user.email, id])
        return res
    }
}

export default new UserRepository()
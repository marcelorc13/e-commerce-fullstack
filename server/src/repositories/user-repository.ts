import Database from "../db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { createUserDTO, loginDTO, updateUserDTO, userResponseDTO } from "../schemas/user-schema";

class UserRepository {
    async selectAll(): Promise<userResponseDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>('SELECT * FROM usuarios')
        return res as userResponseDTO[];
    }


    async select(id: number): Promise<userResponseDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`
            SELECT * FROM usuarios
            WHERE id = ?  
            `, [id])
        return res as userResponseDTO[];
    }

    async insert(user: createUserDTO) {
        const res = await Database.query<ResultSetHeader>(`
            INSERT INTO usuarios(nome, sobrenome, email, senha)
            VALUES(?, ? , ?, ?);
            `, [user.nome, user.sobrenome, user.email, user.senha])

        return res
    }

    async delete(id: number) {
        const res = await Database.query<ResultSetHeader>(`
            DELETE FROM usuarios
            WHERE id = ?
            `, [id])
        return res
    }

    async update(user: updateUserDTO, id: number) {
        const res = await Database.query<ResultSetHeader>(`
            UPDATE usuarios
            SET nome = ?,
                sobrenome = ?,
                email = ?
            WHERE id = ?
            `, [user.nome, user.sobrenome, user.email, id])
        return res
    }

    async login(user: loginDTO): Promise<loginDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`
            SELECT email, senha FROM usuarios
            WHERE email = ? AND senha = ?;
            `, [user.email, user.senha])
        return res as loginDTO[]
    }
}

export default new UserRepository()
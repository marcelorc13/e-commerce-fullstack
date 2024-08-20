import mysql, { Pool, PoolOptions, QueryResult, RowDataPacket } from 'mysql2/promise';
import { dotenvConfig } from '../config/dotenvConfig';
dotenvConfig()

class Database {
    private pool: Pool | null = null

    constructor() {
        this.connect()
    }

    private async connect() {
        try {
            const options: PoolOptions = {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB
            }

            this.pool = mysql.createPool(options)
        }
        catch (err: unknown) {
            console.log(err)
            throw err
        }
    }

    public async query<T extends RowDataPacket[]>(sql: string, params?: any[]): Promise<[T, any]> {
        if (!this.pool) {
            throw new Error('Sem conexão estabalacida com o banco de dadods')
        }
        const [rows, fields] = await this.pool.query<T>(sql, params)
        return [rows, fields];
    }

}

export default new Database();

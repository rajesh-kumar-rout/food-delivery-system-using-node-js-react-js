import { createPool } from "mysql2/promise"
import { config } from "dotenv"

config()

export const pool = createPool({
    connectionLimit: 1,
    namedPlaceholders: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
})

export const query = async (sql, params) => {
    const [rows] = await pool.query(sql, params)
    return rows
}

export const fetch = async (sql, params) => {
    const [rows] = await pool.query(sql, params)
    return rows?.[0]
}
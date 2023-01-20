import { config } from "dotenv"
import knex from "knex"

config()

export default knex({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    acquireConnectionTimeout: 60000,
    pool: {
        min: 1,
        max: 1
    }
})

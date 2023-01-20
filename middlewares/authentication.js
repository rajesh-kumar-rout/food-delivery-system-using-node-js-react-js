import { config } from "dotenv"
import knex from "../utils/database.js"

config()

export async function authenticate(req, res, next) {
    const token = req.headers.authorization ?? null

    const tokenRow = await knex("foodTokens")
        .where({ token })
        .first()

    if (tokenRow) {
        req.currentUserId = tokenRow.userId
    }

    next()
}
export async function isAuthenticated(req, res, next) {
    if (!req.currentUserId) {
        return res.status(401).json({ error: "Authentication failed" })
    }

    next()
}

export async function isAdmin(req, res, next) {
    const currentUserId = req.currentUserId ?? null

    const isAdmin = await knex("foodUsers")
        .where({ id: currentUserId })
        .where({ isAdmin: true })
        .select(1)
        .first()

    if (!isAdmin) {
        return res.status(403).json({ error: "Access denied" })
    }

    next()
}

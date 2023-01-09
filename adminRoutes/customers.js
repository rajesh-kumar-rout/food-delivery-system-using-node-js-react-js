import { Router } from "express"
import { query } from "../database/connection.js"

const router = Router()

router.get("/", async (req, res) => {
    const customers = await query("SELECT id, name, email, createdAt, updatedAt FROM food_users")
    res.json(customers)
})

export default router
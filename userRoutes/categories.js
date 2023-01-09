import { Router } from "express"
import { query } from "../database/connection.js"

const router = Router()

router.get("/", async (req, res) => {
    const categories = await query("SELECT * FROM food_categories")
    res.json(categories)
})

export default router
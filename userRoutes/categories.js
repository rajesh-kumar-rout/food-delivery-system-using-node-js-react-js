import { Router } from "express"
import knex from "../utils/database.js"

const router = Router()

router.get("/", async (req, res) => {
    const categories = await knex("foodCategories")
    
    res.json(categories)
})

export default router
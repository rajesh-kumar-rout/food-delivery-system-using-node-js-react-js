import { Router } from "express"
import knex from "../utils/database.js"

const router = Router()

router.get("/", async (req, res) => {
    const sliders = await knex("foodSliders")
        .select(
            "id",
            "imageUrl"
        )
        
    res.json(sliders)
})

export default router
import { Router } from "express"
import { query } from "../database/connection.js"

const router = Router()

router.get("/", async (req, res) => {
    const sliders = await query("SELECT id, imgUrl FROM food_sliders")
    res.json(sliders)
})

export default router
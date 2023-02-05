import { Router } from "express"
import { Category } from "../models/model.js"

const router = Router()

router.get("/", async (req, res) => {
    const categories = await Category.findAll()
    
    res.json(categories)
})

export default router
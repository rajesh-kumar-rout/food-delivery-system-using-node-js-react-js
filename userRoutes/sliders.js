import { Router } from "express"
import { Slider } from "../models/model.js"

const router = Router()

router.get("/", async (req, res) => {
    const sliders = await Slider.findAll()
        
    res.json(sliders)
})

export default router
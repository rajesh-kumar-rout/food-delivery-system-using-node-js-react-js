import { Router } from "express"
import { body } from "express-validator"
import { Slider } from "../models/model.js"
import { checkValidationError } from "../utils/validator.js"
const router = Router()

router.get("/", async (req, res) => {
    const sliders = await Slider.findAll()

    res.json(sliders)
})

router.post(
    "/",

    body("imageUrl").isURL(),

    checkValidationError,

    async (req, res) => {
        const { imageUrl } = req.body

        const slider = await Slider.create({
            imageUrl
        })

        res.status(201).json(slider)
    }
)

router.delete("/:sliderId", async (req, res) => {
    const { sliderId } = req.params

    const slider = await Slider.findByPk(sliderId)

    if(!slider) {
        return res.status(404).json({error: "Slider not found"})
    }
    
    await slider.destroy()

    res.json(slider)
})

export default router
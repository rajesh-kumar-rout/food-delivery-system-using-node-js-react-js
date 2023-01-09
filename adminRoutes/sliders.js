import { Router } from "express"
import { body, param } from "express-validator"
import { query, fetch } from "../database/connection.js"
import { destroy, upload } from "../utils/cloudinary.js"
import { checkValidationError, isBase64Img } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const sliders = await query("SELECT id, imgUrl, createdAt FROM food_sliders")
    res.json(sliders)
})

router.post(
    "/",

    body("img")
        .isString()
        .custom(isBase64Img),

    checkValidationError,

    async (req, res) => {
        const { img } = req.body

        const { imgUrl, imgId } = await upload(img)

        await query("INSERT INTO food_sliders (imgUrl, imgId) VALUES (?, ?)", [imgUrl, imgId])

        res.status(201).json({ message: "Slider created successfully" })
    }
)

router.delete(
    "/:sliderId",

    param("sliderId").isInt(),

    async (req, res) => {
        const { sliderId } = req.params

        const slider = await fetch("SELECT * FROM food_sliders WHERE id = ?", [sliderId])

        if (!slider) {
            return res.status(404).json({ message: "Slider not found" })
        }

        await destroy(slider.imgId)

        await query("DELETE FROM food_sliders WHERE id = ?", [sliderId])

        res.json({ message: "Slider deleted successfully" })
    }
)

export default router
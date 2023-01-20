import { Router } from "express"
import { body } from "express-validator"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const sliders = await knex("foodSliders")
        .select(
            "id",
            "imageUrl",
            "createdAt"
        )

    res.json(sliders)
})

router.post(
    "/",

    body("imageUrl").isURL(),

    checkValidationError,

    async (req, res) => {
        const { imageUrl } = req.body

        await knex("foodSliders").insert({ imageUrl })

        res.status(201).json({ success: "Slider created successfully" })
    }
)

router.delete("/:sliderId", async (req, res) => {
    const { sliderId } = req.params

    await knex("foodSliders")
        .where({ id: sliderId })
        .del()

    res.json({ success: "Slider deleted successfully" })
})

export default router
import { Router } from "express"
import { body } from "express-validator"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const settings = await knex("foodSettings")
        .select(
            "id", 
            "deliveryFee", 
            "gstPercentage",
            "createdAt", 
            "updatedAt"
        )
        .first()

    res.json(settings)
})

router.patch(
    "/",

    body("deliveryFee").isInt().toInt(),

    body("gstPercentage").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { deliveryFee, gstPercentage } = req.body

        await knex("foodSettings").update({
            deliveryFee,
            gstPercentage
        })

        res.json({ success: "Setting edited successfully" })
    }
)

export default router
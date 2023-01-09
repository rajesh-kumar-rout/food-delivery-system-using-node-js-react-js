import { Router } from "express"
import { body } from "express-validator"
import { query, fetch } from "../database/connection.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const settings = await query("SELECT id, deliveryFee, gstPercentage, updatedAt FROM food_settings")
    res.json(settings)
})

router.patch(
    "/",

    body("deliveryFee").isInt(),

    body("gstPercentage").isInt(),

    checkValidationError,

    async (req, res) => {
        const { deliveryFee, gstPercentage } = req.body

        await query("UPDATE food_settings SET deliveryFee = ?, gstPercentage = ?", [deliveryFee, gstPercentage])

        res.json({ message: "Setting edited successfully" })
    }
)

export default router
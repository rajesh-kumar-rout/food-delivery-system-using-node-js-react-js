import { Router } from "express"
import { body } from "express-validator"
import { Setting } from "../models/model.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const setting = await Setting.findOne()

    res.json(setting)
})

router.patch(
    "/",

    body("deliveryFee").isInt().toInt(),

    body("gstPercentage").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { deliveryFee, gstPercentage } = req.body

        const setting = await Setting.findOne()

        setting.deliveryFee = deliveryFee

        setting.gstPercentage = gstPercentage

        await setting.save()

        res.json(setting)
    }
)

export default router
import { Router } from "express"
import { body } from "express-validator"
import { User } from "../models/model.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const deliveryAgents = await User.findAll({
        where: {
            isDeliveryAgent: true
        },
        attributes: {
            exclude: ["password"]
        }
    })

    res.json(deliveryAgents)
})

router.post(
    "/",

    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .isLength({ max: 30 }),

    checkValidationError,

    async (req, res) => {
        const { email } = req.body

        const user = await User.findOne({where: {email}})

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        user.isDeliveryAgent = true 

        await user.save()

        res.json({ success: "Delivery agent created successfully" })
    }
)

router.delete("/:deliveryAgentId", async (req, res) => {
    const { deliveryAgentId } = req.params

    const user = await User.findOne({
        where: {
            id: deliveryAgentId,
            isDeliveryAgent: true
        }
    })

    if(!user){
        return res.status(404).json({error: "Delivery agent not found"})
    }

    user.isDeliveryAgent = false 

    await user.save()

    res.json({ success: "Delivery boy removed successfully" })
})

export default router
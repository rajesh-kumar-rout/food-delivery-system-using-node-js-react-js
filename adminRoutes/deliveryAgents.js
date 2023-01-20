import { Router } from "express"
import { body } from "express-validator"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const deliveryAgents = await knex("foodUsers")
        .select(
            "id",
            "name",
            "email",
            "createdAt",
            "updatedAt",

            knex("foodOrders")
                .where("foodOrders.deliveryAgentId", "foodUsers.id")
                .count()
                .as("totalDeliveryDone")
        )
        .where("foodUsers.isDeliveryAgent", true)

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

        const isUserExists = await knex("foodUsers")
            .where({ email })
            .select(1)
            .first()

        if (!isUserExists) {
            return res.status(404).json({ error: "Email does not exists" })
        }

        const isDeliveryAgentExists = await knex("foodUsers")
            .where({ email })
            .where({ isDeliveryAgent: true })
            .select(1)
            .first()

        if (await isDeliveryAgentExists) {
            return res.status(409).json({ error: "Delivery boy already exists" })
        }

        await knex("foodUsers")
            .where({ email })
            .update({ isDeliveryAgent: true })

        res.json({ success: "Delivery boy created successfully" })
    }
)

router.delete("/:deliveryBoyId", async (req, res) => {
    const { deliveryBoyId } = req.params

    await knex("foodUsers")
        .where({ id: deliveryBoyId })
        .update({ isDeliveryAgent: false})

    res.json({ success: "Delivery boy removed successfully" })
})

export default router
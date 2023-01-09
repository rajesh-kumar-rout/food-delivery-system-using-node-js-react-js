import { Router } from "express"
import { body, param } from "express-validator"
import { fetch, query } from "../database/connection.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const deliveryBoys = await query("SELECT id, name, email, (SELECT COUNT(food_orders.id) FROM food_orders WHERE food_orders.deliveryAgentId = food_users.id) AS totalDeliveryDone, createdAt FROM food_users WHERE isDeliveryBoy = 1")
    res.json(deliveryBoys)
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

        if(!await fetch("SELECT 1 FROM food_users WHERE email = ?", [email])){
            return res.status(404).json({ message: "Email does not exists"})
        }

        if(await fetch("SELECT 1 FROM food_users WHERE isDeliveryBoy = 1 AND email = ?", [email])){
            return res.status(409).json({ message: "Delivery boy already exists"})
        }

        await query("UPDATE food_users SET isDeliveryBoy = 1 WHERE email = ?", [email])

        res.json({ message: "Delivery boy created successfully" })
    }
)

router.delete(
    "/:deliveryBoyId",

    param("deliveryBoyId").isInt(),

    async (req, res) => {
        const { deliveryBoyId } = req.params
        
        await query("UPDATE food_users SET isDeliveryBoy = 0 WHERE id = ? AND isDeliveryBoy = 1", [deliveryBoyId])

        res.json({ message: "Delivery boy removed successfully" })
    }
)

export default router
import { Router } from "express"
import { body } from "express-validator"
import { query, fetch } from "../database/connection.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.post(
    "/",

    body("name")
        .trim()
        .isLength({ min: 2, max: 30 }),

    body("mobile")
        .isInt(),

    body("street")
        .trim()
        .isLength({ min: 2, max: 30 }),

    body("landmark")
        .trim()
        .isLength({ min: 2, max: 30 }),

    body("instruction")
        .optional()
        .trim()
        .isLength({ min: 2, max: 255 })
        .default(""),

    checkValidationError,

    async (req, res) => {
        const { userId, cart } = req.session
        const { name, mobile, street, landmark, instruction } = req.body

        if (!cart?.length) {
            return res.status(422).json({ message: "Your cart is empty" })
        }

        const { insertId } = await query("INSERT INTO food_orders (userId, orderStatusId) VALUES (?, ?)", [userId, 1])

        let totalPrice = 0

        for (const cartItem of cart) {
            const food = await fetch("SELECT * FROM food_foods WHERE id = ? LIMIT 1", [cartItem.id])
      
            await query("INSERT INTO food_ordered_foods (name, price, qty, orderId) VALUES (?, ?, ?, ?)", [food.name, food.price, cartItem.qty, insertId])
            
            totalPrice += food.price
        }

        const settings = await fetch("SELECT * FROM food_settings LIMIT 1")

        await query("INSERT INTO food_payment_details (totalPrice, gstPercentage, deliveryFee, orderId) VALUES (?, ?, ?, ?)", [totalPrice, settings.gstPercentage, settings.deliveryFee, insertId])

        await query("INSERT INTO food_delivery_address (name, mobile, street, landmark, instruction, orderId) VALUES (?, ?, ?, ?, ?, ?)", [name, mobile, street, landmark, instruction, insertId])

        req.session.cart = []
        req.session.save()

        res.status(201).json({ message: "Order created successfully" })
    }
)

router.get("/", async (req, res) => {
    const { userId } = req.session

    const orders = await query("SELECT food_orders.id, (SELECT COUNT(food_ordered_foods.orderId) FROM food_ordered_foods WHERE food_ordered_foods.orderId = food_orders.id ) AS totalFoods, food_orders.createdAt, ( food_payment_details.totalPrice + food_payment_details.deliveryFee + ( food_payment_details.totalPrice * ( food_payment_details.gstPercentage / 100 ) ) ) AS totalPrice, food_order_statuses.name AS status FROM food_orders INNER JOIN food_order_statuses ON food_order_statuses.id = food_orders.orderStatusId INNER JOIN food_payment_details ON food_payment_details.orderId = food_orders.id WHERE food_orders.userId = ?", [userId])

    res.json(orders)
})

router.get(
    "/:orderId",

    async (req, res) => {
        const { userId } = req.session

        const { orderId } = req.params

        if (!fetch("SELECT 1 FROM food_orders WHERE id = ? AND userId = ? LIMIT 1", [orderId, userId])) {
            return res.status(404).json({ message: "Order not found" })
        }

        const foods = await query("SELECT * FROM food_ordered_foods WHERE orderId = ?", [orderId])

        const deliveryAddress = await query("SELECT * FROM food_delivery_address WHERE orderId = ? LIMIT 1", [orderId])

        const paymentDetails = await query("SELECT totalPrice, gstPercentage, deliveryFee, (totalPrice * (gstPercentage / 100)) AS gstAmount FROM food_payment_details WHERE orderId = ?", [orderId])

        res.json({
            foods,
            deliveryAddress,
            paymentDetails
        })
    }
)

export default router
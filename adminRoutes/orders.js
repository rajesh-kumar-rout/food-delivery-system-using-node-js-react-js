import express from "express"
import { body, param } from "express-validator"
import { fetch, query } from "../database/connection.js"
import { checkValidationError } from "../utils/validator.js"

const router = express()

router.get("/", async (req, res) => {
    const orders = await query("SELECT food_orders.id, food_delivery_address.mobile, ROUND(food_payment_details.totalPrice + food_payment_details.deliveryFee + (food_payment_details.totalPrice * (food_payment_details.gstPercentage / 100))) AS totalPayable, food_order_statuses.name AS status, food_orders.createdAt FROM food_orders INNER JOIN food_payment_details ON food_payment_details.orderId = food_orders.id INNER JOIN food_delivery_address ON food_delivery_address.orderId = food_orders.id INNER JOIN food_order_statuses ON food_order_statuses.id = food_orders.orderStatusId")
    res.json(orders)
})

router.get("/statuses", async (req, res) => {
    const statuses = await query("SELECT id, name FROM food_order_statuses")
    res.json(statuses)
})

router.get(
    "/:orderId",

    param("orderId").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { orderId } = req.params

        if (!await fetch("SELECT 1 FROM food_orders WHERE id = ? LIMIT 1", [orderId])) {
            return res.status(404).json({ message: "Order not found" })
        }

        const orderedFoods = await query("SELECT id, name, price, qty FROM food_ordered_foods WHERE orderId = ?", [orderId])

        const order = await fetch("SELECT id, orderStatusId, deliveryAgentId, userId, createdAt, updatedAt FROM food_orders WHERE id = ?", [orderId])

        const paymentDetails = await fetch("SELECT totalPrice, deliveryFee, gstPercentage FROM food_payment_details WHERE orderId = ? LIMIT 1", [orderId])

        const deliveryAddress = await fetch("SELECT name, mobile, street, landmark, instruction FROM food_delivery_address WHERE orderId = ? LIMIT 1", [orderId])

        res.json({
            order,
            orderedFoods,
            paymentDetails,
            deliveryAddress
        })
    }
)

router.patch(
    "/:orderId",

    param("orderId")
        .isInt()
        .toInt(),

    body("orderStatusId")
        .isInt()
        .toInt(),

    body("deliveryBoyId")
        .isInt()
        .toInt(),

    checkValidationError,

    async (req, res) => {
        const { orderId } = req.params
        const { orderStatusId, deliveryBoyId } = req.body

        if (!await fetch("SELECT 1 FROM food_orders WHERE id = ? LIMIT 1", [orderId])) {
            return res.status(404).json({ message: "Order not found" })
        }

        if (!await fetch("SELECT 1 FROM food_order_statuses WHERE id = ? LIMIT 1", [orderStatusId])) {
            return res.status(404).json({ message: "Order status not found" })
        }

        if (!await fetch("SELECT 1 FROM food_users WHERE isDeliveryBoy = TRUE AND id = ? LIMIT 1", [deliveryBoyId])) {
            return res.status(404).json({ message: "Delivery boy not found" })
        }

        await query("UPDATE food_orders SET deliveryAgentId = ?, orderStatusId = ? WHERE id = ?", [deliveryBoyId, orderStatusId, orderId])

        res.json({ message: "Order updated successfully" })
    }
)

export default router
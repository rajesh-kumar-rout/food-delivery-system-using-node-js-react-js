import express from "express"
import { body, param } from "express-validator"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = express()

router.get("/", async (req, res) => {
    const { orders } = await knex("foodOrders")
        .join("foodPaymentDetails", "foodPaymentDetails.orderId", "foodOrders.id")
        .join("foodDeliveryAddresses", "foodDeliveryAddresses.orderId", "foodOrders.id")
        .select(
            "foodOrders.id",
            "foodOrders.status",
            "foodOrders.createdAt",
            "foodDeliveryAddresses.mobile",

            knex.raw(`ROUND(
                foodPaymentDetails.foodPrice + 
                foodPaymentDetails.deliveryFee + 
                (foodPaymentDetails.foodPrice * foodPaymentDetails.gstPercentage / 100)
            ) AS totalPayable`)
        )

    res.json(orders)
})

router.get("/:orderId", async (req, res) => {
    const { orderId } = req.params

    const isOrderExists = await knex("foodOrders")
        .where({ id: orderId })
        .select(1)
        .first()

    if (!await isOrderExists) {
        return res.status(404).json({ error: "Order not found" })
    }

    const orderedFoods = await knex("foodOrderedFoods")
        .where({ orderId })
        .select(
            "id",
            "name",
            "qty"
        )

    const paymentDetails = await knex("foodPaymentDetails")
        .where({ orderId })
        .select(
            "foodPrice",
            "deliveryFee",
            "gstPercentage",
            knex.raw("(foodPrice + deliveryFee + (foodPrice * gstPercentage / 100)) AS totalAmount")
        )

    const deliveryAddress = await knex("foodDeliveryAddresses")
        .where({ orderId })
        .select(
            "name",
            "mobile",
            "street",
            "landmark",
            "instruction"
        )

    const order = await knex("foodOrders")
        .where({ id: orderId })
        .select(
            "id",
            "status",
            "deliveryAgentId",
            "createdAt",
            "updatedAt"
        )

    res.json({
        order,
        orderedFoods,
        paymentDetails,
        deliveryAddress
    })
})

router.patch(
    "/:orderId",

    param("orderId").isInt().toInt(),

    body("status").isIn(["Placed", "Preparing", "Prepared", "Delivered"]),

    body("deliveryAgentId").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { orderId } = req.params
        const { deliveryAgentId } = req.body

        const isOrderExists = await knex("foodOrders")
            .where({ id: orderId })
            .select(1)
            .first()

        if (!isOrderExists) {
            return res.status(404).json({ error: "Order not found" })
        }

        const isDeliveryAgentExists = await knex("socialUsers")
            .where({ id: deliveryAgentId })
            .where({ isDeliveryAgent: true })
            .select(1)
            .first()

        if (!isDeliveryAgentExists) {
            return res.status(404).json({ error: "Delivery boy not found" })
        }

        await knex("socialOrders")
            .where({ id: orderId })
            .update({
                status,
                deliveryAgentId
            })

        res.json({ success: "Order updated successfully" })
    }
)

export default router
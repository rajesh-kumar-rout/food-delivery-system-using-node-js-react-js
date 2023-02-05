import express from "express"
import { body, param } from "express-validator"
import { DeliveryAddress, Order, OrderedFood, PaymentDetails } from "../models/model.js"
import { checkValidationError } from "../utils/validator.js"

const router = express()

router.get("/", async (req, res) => {
    const orders = await Order.findAll({
        include: {
            model: PaymentDetails,
            required: true
        }
    })

    res.json(orders)
})

router.get("/:orderId", async (req, res) => {
    const { orderId } = req.params

    const order = await Order.findOne({
        where: {
            id: orderId
        },
        include: [
            {
                model: DeliveryAddress,
                required: true
            },
            {
                model: PaymentDetails,
                required: true
            },
            {
                model: OrderedFood,
                required: true
            }
        ]
    })

    res.json(order)
})

router.patch(
    "/:orderId",

    param("orderId").isInt().toInt(),

    body("status").isIn(["Placed", "Preparing", "Prepared", "Canceled", "Delivered"]),

    body("deliveryAgentId")
        .optional()
        .isInt()
        .toInt(),

    checkValidationError,

    async (req, res) => {
        const { orderId } = req.params
        const { deliveryAgentId, status } = req.body

        const order = await Order.findByPk(orderId)

        if(!order) {
            return res.status(404).json({ error: "Order not found" })
        }

        order.status = status

        order.deliveryAgentId = deliveryAgentId

        await order.save()

        res.json({ success: "Order updated successfully" })
    }
)

export default router
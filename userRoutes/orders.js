import { Router } from "express"
import { body } from "express-validator"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.post(
    "/",

    body("name").trim().isLength({ max: 30 }),

    body("mobile").isInt(),

    body("street").trim().isLength({ max: 30 }),

    body("landmark").trim().isLength({ max: 30 }),

    body("instruction")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .default(""),

    checkValidationError,

    async (req, res) => {
        const { currentUserId } = req
        const { name, mobile, street, landmark, instruction } = req.body

        const cart = await knex("foodCart")
            .where({ userId: currentUserId })
            .join("foodFoods", "foodFoods.id", "foodCart.foodId")
            .select(
                "foodCart.qty",
                "foodFoods.name",
                "foodFoods.price"
            )

        if (!cart?.length) {
            return res.status(422).json({ error: "Your cart is empty" })
        }

        const [orderId] = await knex("foodOrders").insert({
            userId: currentUserId,
            status: "Placed"
        })

        await knex("foodDeliveryAddresses").insert({
            orderId,
            name,
            mobile,
            street,
            landmark,
            instruction
        })

        let foodPrice = 0

        for (const cartItem of cart) {
            await knex("foodOrderedFoods").insert({
                orderId,
                name: cartItem.name,
                price: cartItem.price,
                qty: cartItem.qty
            })

            foodPrice += cartItem.price
        }

        const settings = await knex("foodSettings").first()

        await knex("foodPaymentDetails").insert({
            orderId,
            foodPrice,
            deliveryFee: settings.deliveryFee,
            gstPercentage: settings.gstPercentage
        })

        await knex("foodCart")
            .where({ userId: currentUserId })
            .del()

        res.status(201).json({ orderId })
    }
)

router.get("/", async (req, res) => {
    const { currentUserId } = req

    const orders = await knex("foodOrders")
        .where({ userId: currentUserId })
        .select(
            "foodOrders.id",
            "foodOrders.status",
            "foodOrders.createdAt",
            "foodOrders.updatedAt",

            knex("foodOrderedFoods")
                .whereColumn("foodOrderedFoods.orderId", "foodOrders.id")
                .count()
                .as("totalFoods"),

            knex("foodPaymentDetails")
                .whereColumn("foodPaymentDetails.orderId", "foodOrders.id")
                .select(knex.raw(`
                    CAST(
                        ROUND(
                            foodPaymentDetails.foodPrice +
                            foodPaymentDetails.deliveryFee + 
                            foodPaymentDetails.foodPrice * (foodPaymentDetails.gstPercentage / 100)
                        ) 
                        AS SIGNED
                    )
                `))
                .first()
                .as("totalAmount")
        )
        .orderBy("foodOrders.id", "desc")

    res.json(orders)
})

router.get(
    "/:orderId",

    async (req, res) => {
        const { currentUserId } = req

        const { orderId } = req.params

        const isOrderExists = await knex("foodOrders")
            .where({ id: orderId })
            .where({ userId: currentUserId })
            .select(1)
            .first()

        if (!isOrderExists) {
            return res.status(404).json({ error: "Order not found" })
        }

        const foods = await knex("foodOrderedFoods")
            .where({ orderId })
            .select(
                "id",
                "name",
                "price",
                "qty",
            )

        const deliveryAddress = await knex("foodDeliveryAddresses")
            .where({ orderId })
            .select(
                "id",
                "name",
                "mobile",
                "street",
                "landmark",
                "instruction"
            )
            .first()

        const paymentDetails = await knex("foodPaymentDetails")
            .where({ orderId })
            .select(
                "id",
                "foodPrice",
                "deliveryFee",
                "gstPercentage"
            )
            .first()

        paymentDetails.gstAmount = Math.round(paymentDetails.foodPrice * (paymentDetails.gstPercentage / 100))

        paymentDetails.totalAmount = paymentDetails.foodPrice + paymentDetails.deliveryFee + paymentDetails.gstAmount

        res.json({
            foods,
            deliveryAddress,
            paymentDetails
        })
    }
)

export default router
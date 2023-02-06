import { Router } from "express"
import { body } from "express-validator"
import { Op } from "sequelize"
import { Cart, DeliveryAddress, Food, Order, OrderedFood, PaymentDetails, Setting } from "../models/model.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.post(
    "/",

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    body("mobile").isInt(),

    body("street")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    body("landmark")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    body("instruction")
        .optional()
        .trim()
        .isLength({ max: 255 }),

    checkValidationError,

    async (req, res) => {
        const { _id } = req

        const cart = await Cart.findAll({
            where: {
                userId: _id
            },
            include: {
                model: Food,
                as: "food"
            }
        })

        if (cart.length === 0) {
            return res.status(404).json({ error: "Cart not found" })
        }

        const setting = await Setting.findOne()

        let foodPrice = 0

        cart.forEach(cartItem => {
            foodPrice += cartItem.food.price * cartItem.quantity
        })

        const gstAmount = Math.round(foodPrice * (setting.gstPercentage / 100))
// console.log(setting.gstAmount);
// return res.status(201).json("")
        const totalAmount = gstAmount + setting.deliveryFee + foodPrice

        const order = await Order.create(
            {
                status: "Preparing",
                userId: _id,
                foods: cart.map(cartItem => ({
                    name: cartItem.food.name,
                    price: cartItem.food.price,
                    quantity: cartItem.quantity
                })),
                deliveryAddress: req.body,
                paymentDetails: {
                    foodPrice,
                    gstAmount,
                    gstPercentage: setting.gstPercentage,
                    deliveryFee: setting.deliveryFee,
                    totalAmount
                }
            },
            {
                include: [
                    { association: Order.DeliveryAddress, as: "deliveryAddress" },
                    { association: Order.PaymentDetails, as: "paymentDetails" },
                    {
                        association: Order.Foods,
                        as: 'food'
                    }
                ]
            }
        )

        res.status(201).json(order)
    }
)

router.get("/", async (req, res) => {
    const { _id } = req

    const orders = await Order.findAll({
        where: {
            userId: _id
        },
        include: {
            model: PaymentDetails,
            as: "paymentDetails",
            attributes: ["totalAmount"]
        },
        order: [
            ["id", "desc"]
        ]
    })

    res.json(orders)
})

router.get("/:orderId", async (req, res) => {
    const { _id } = req

    const { orderId } = req.params

    const order = await Order.findOne({
        where: {
            [Op.and]: {
                userId: _id,
                id: orderId
            }
        },
        include: [
            {
                model: DeliveryAddress,
                as: "deliveryAddress"
            },
            {
                model: PaymentDetails,
                as: "paymentDetails"
            },
            {
                model: OrderedFood,
                as: "foods"
            }
        ]
    })

    res.json(order)
})

export default router
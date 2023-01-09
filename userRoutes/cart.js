import { Router } from "express"
import { body, param } from "express-validator"
import { fetch } from "../database/connection.js"
import { checkValidationError } from "../utils/validator.js"
import { authenticate } from "../middlewares/authentication.js"

const router = Router()

router.post(
    "/",

    body("id").isInt(),

    body("qty").isInt(),

    checkValidationError,

    async (req, res) => {
        const { cart } = req.session
        const { id, qty } = req.body

        let newCart = []

        if (cart) {
            newCart = [...cart]
        }

        if (!await fetch("SELECT 1 FROM food_foods WHERE id = ? LIMIT 1", [id])) {
            return res.status(404).json({ message: "Food not found" })
        }

        const index = newCart.findIndex(cartItem => cartItem.id === id)

        if (index === -1) {
            newCart.push({ id, qty })
        } else {
            newCart[index].qty = qty
        }

        req.session.cart = newCart
        req.session.save()

        res.json({ message: "Cart created" })
    }
)

router.get("/pricing", async (req, res) => {
    let { cart } = req.session

    if (!cart) {
        cart = []
    }

    let totalPrice = 0

    const { deliveryFee, gstPercentage } = await fetch("SELECT * FROM food_settings LIMIT 1")

    for (const cartItem of cart) {
        const { price } = await fetch("SELECT price FROM food_foods WHERE id = ? LIMIT 1", [cartItem.id])
        totalPrice += price * cartItem.qty
    }

    const gstAmount = Math.round(totalPrice * (gstPercentage / 100))

    const totalPayable = totalPrice + gstAmount + deliveryFee

    res.json({
        totalPrice,
        deliveryFee,
        gstPercentage,
        gstAmount,
        totalPayable
    })
})

router.get("/", async (req, res) => {
    const { cart } = req.session

    const foods = []

    for (const cartItem of cart) {
        const food = await fetch("SELECT id, name, price, imgUrl FROM food_foods WHERE id = ? LIMIT 1", [cartItem.id])
        foods.push({ ...food, qty: cartItem.qty })
    }

    res.json(foods)
})

router.delete(
    "/:id",

    param("id").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { id } = req.params
        const { cart } = req.session

        let newCart = []

        if (cart) {
            newCart = [...cart]
        }

        newCart = newCart.filter(cartItem => cartItem.id !== id)

        req.session.cart = newCart
        req.session.save()

        res.json({ message: "Cart deleted successfully" })
    }
)

export default router
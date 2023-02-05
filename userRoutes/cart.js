import { Router } from "express"
import { body } from "express-validator"
import { checkValidationError } from "../utils/validator.js"
import { Cart, Food, Setting } from "../models/model.js"
import { Op } from "sequelize"

const router = Router()

router.post(
    "/",

    body("foodId").isInt().toInt(),

    body("quantity").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { _id } = req
        const { foodId, quantity } = req.body

        let cart = await Cart.findOne({
            where: {
                [Op.and]: {
                    foodId,
                    userId: _id
                }
            }
        })

        if(cart) {
            cart.quantity = quantity

            await cart.save()

            return res.status(201).json(cart)
        }

        cart = await Cart.create({
            userId: _id,
            foodId,
            quantity
        }) 

        res.json(cart)
    }
)

router.get("/pricing", async (req, res) => {
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

    const setting = await Setting.findOne()

    let foodPrice = 0

    cart.map(cartItem => {
        foodPrice += cartItem.food.price * cartItem.quantity
    })

    const gstAmount = Math.round(foodPrice * setting.gstPercentage / 100)

    const totalAmount = foodPrice + gstAmount + setting.deliveryFee

    res.json({
        foodPrice,
        gstAmount,
        totalAmount,
        gstPercentage: setting.gstPercentage,
        deliveryFee: setting.deliveryFee
    })
})

router.get("/", async (req, res) => {
    const { _id } = req

    const foods = await Cart.findAll({
        where: {
            userId: _id
        },
        include: {
            model: Food,
            as: "food"
        }
    })

    res.json(foods)
})

router.delete("/:foodId", async (req, res) => {
    const { _id } = req

    const { foodId } = req.params

    const cart = await Cart.findOne({
        userId: _id,
        foodId
    })

    if(!cart) {
        return res.status(404).json({error: "Food not found in cart"})
    }

    await cart.destroy()

    res.json({ success: "Food removed from cart successfully" })
})

export default router
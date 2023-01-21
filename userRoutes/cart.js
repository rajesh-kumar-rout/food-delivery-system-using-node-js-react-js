import { Router } from "express"
import { body } from "express-validator"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.post(
    "/",

    body("foodId").isInt().toInt(),

    body("qty").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { currentUserId } = req
        const { foodId, qty } = req.body

        const isFoodExists = await knex("foodFoods")
            .where({ id: foodId })
            .select(1)
            .first()

        if (!isFoodExists) {
            return res.status(404).json({ error: "Food not found" })
        }

        const isCartItemExists = await knex("foodCart")
            .where({ userId: currentUserId })
            .where({ foodId })
            .select(1)
            .first()

        if (isCartItemExists) {
            await knex("foodCart")
                .where({ userId: currentUserId })
                .where({ foodId })
                .update({ qty })

            return res.json({ success: "Cart updated" })
        }

        await knex("foodCart").insert({
            foodId,
            userId: currentUserId,
            qty
        })

        res.status(201).json({ success: "Cart created" })
    }
)

router.get("/pricing", async (req, res) => {
    const { currentUserId } = req

    const { foodPrice } = await knex("foodCart")
        .where({ userId: currentUserId })
        .join("foodFoods", "foodFoods.id", "foodCart.foodId")
        .select(knex.raw("CAST(SUM(foodFoods.price * foodCart.qty) AS INT) AS foodPrice"))
        .first()

    const settings = await knex("foodSettings").first()
console.log(settings.gstPercentage);
    const gstAmount = Math.round(foodPrice * (settings.gstPercentage / 100))

    const totalAmount = settings.deliveryFee + gstAmount + foodPrice

    res.json({
        foodPrice,
        deliveryFee: settings.deliveryFee,
        gstPercentage: settings.gstPercentage,
        gstAmount,
        totalAmount
    })
})

router.get("/", async (req, res) => {
    const { currentUserId } = req

    const foods = await knex("foodCart")
        .where({ userId: currentUserId })
        .join("foodFoods", "foodFoods.id", "foodCart.foodId")
        .select(
            "foodCart.foodId",
            "foodCart.qty",
            "foodFoods.name",
            "foodFoods.price",
            "foodFoods.imageUrl"
        )

    res.json(foods)
})

router.delete("/:foodId", async (req, res) => {
    const { currentUserId } = req
    const { foodId } = req.params

    await knex("foodCart")
        .where({ userId: currentUserId })
        .where({ foodId })
        .del()

    res.json({ success: "Food removed from cart successfully" })
})

export default router
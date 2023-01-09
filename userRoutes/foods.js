import { Router } from "express"
import { fetch, query } from "../database/connection.js"
import { checkValidationError } from "../utils/validator.js"
import { param } from "express-validator"

const router = Router()

router.get("/featured", async (req, res) => {
    const foods = await query("SELECT id, name, imgUrl, price FROM food_foods WHERE isFeatured = TRUE")
    res.json(foods)
})

router.get("/", async (req, res) => {
    const foods = await query("SELECT id, name, imgUrl, price, (SELECT name FROM food_categories WHERE food_categories.id = food_foods.categoryId) AS categoryName FROM food_foods")
    res.json(foods)
})

router.get(
    "/:foodId",

    param("foodId").isInt(),

    checkValidationError,

    async (req, res) => {
        const { foodId } = req.params

        const food = await fetch("SELECT * FROM food_foods WHERE id = ? LIMIT 1", [foodId])

        res.json(food)
    }
)

export default router
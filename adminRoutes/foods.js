import express from "express"
import { body } from "express-validator"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const foods = await knex("foodFoods")
        .select(
            "id",
            "name",
            "price",
            "isFeatured",
            "isVegan",
            "imageUrl",
            "createdAt",
            "updatedAt"
        )

    res.json(foods)
})

router.get("/:foodId", async (req, res) => {
    const { foodId } = req.params

    const food = await knex("foodFoods")
        .where({ id: foodId })
        .first()

    res.json(food)
})

router.post(
    "/",

    body("name").trim().isLength({ max: 100 }),

    body("price").isInt({ max: 10000 }).toInt(),

    body("isFeatured").isBoolean().toBoolean(),

    body("isVegan").isBoolean().toBoolean(),

    body("categoryId").isInt().toInt(),

    body("imageUrl").isURL(),

    checkValidationError,

    async (req, res) => {
        const { name, price, isFeatured, isVegan, categoryId, imageUrl } = req.body

        const isCategoryExists = await knex("foodCategories")
            .where({ id: categoryId })
            .select(1)
            .first()

        if (!isCategoryExists) {
            return res.status(404).json({ error: "Category does not exists" })
        }

        const isFoodExists = await knex("foodFoods")
            .where({ name })
            .select(1)
            .first()

        if (isFoodExists) {
            return res.status(409).json({ error: "Food already exists" })
        }

        await knex("foodFoods").insert({
            name,
            price,
            isVegan,
            isFeatured,
            categoryId,
            imageUrl
        })

        res.status(201).json({ success: "Food created successfully" })
    }
)

router.patch(
    "/:foodId",

    body("name").trim().isLength({ max: 100 }),

    body("price")
        .isInt()
        .toInt()
        .default(0),

    body("isFeatured")
        .isBoolean()
        .toBoolean()
        .default(true),

    body("isVegan")
        .isBoolean()
        .toBoolean()
        .default(false),

    body("categoryId").isInt().toInt(),

    body("imageUrl").optional().isURL(),

    checkValidationError,

    async (req, res) => {
        const { foodId } = req.params

        let { name, price, isFeatured, isVegan, categoryId, imageUrl } = req.body

        const food = await knex("foodFoods")
            .where({ id: foodId })
            .first()

        if (!food) {
            return res.status(404).json({ error: "Food not found" })
        }

        const isFoodExists = await knex("foodFoods")
            .where({ name })
            .whereNot({ id: foodId })
            .select(1)
            .first()

        if (isFoodExists) {
            return res.status(409).json({ error: "Food already exists" })
        }

        const isCategoryExists = await knex("foodCategories")
            .where({ id: categoryId })
            .select(1)
            .first()
        if (!isCategoryExists) {
            return res.status(404).json({ error: "Category does not exists" })
        }

        await knex("foodFoods")
            .where({ id: foodId })
            .update({
                name,
                price,
                isVegan,
                isFeatured,
                categoryId,
                imageUrl
            })

        res.json({ success: "Food updated successfully" })
    }
)

router.delete("/:foodId", async (req, res) => {
    const { foodId } = req.params

    await knex("foodFoods")
        .where({ id: foodId })
        .del()

    res.json({ success: "Food deleted successfully" })
})

export default router
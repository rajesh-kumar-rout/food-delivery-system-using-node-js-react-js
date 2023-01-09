import express from "express"
import { body, param } from "express-validator"
import { query, fetch } from "../database/connection.js"
import { destroy, upload } from "../utils/cloudinary.js"
import { checkValidationError, isBase64Img } from "../utils/validator.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const foods = await query("SELECT id, name, price, isFeatured, isVegan, imgUrl, createdAt, updatedAt FROM food_foods")
    res.json(foods)
})

router.get("/:foodId", async (req, res) => {
    const { foodId } = req.params

    const food = await fetch("SELECT * FROM food_foods WHERE id = ? LIMIT 1", [foodId])

    res.json(food)
})

router.post(
    "/",

    body("name")
        .trim()
        .isLength({ min: 2, max: 100 }),

    body("price")
        .isInt({ min: 0, max: 10000 })
        .toInt(),

    body("isFeatured")
        .isBoolean()
        .toBoolean(),

    body("isVegan")
        .isBoolean()
        .toBoolean(),

    body("categoryId")
        .isInt()
        .toInt(),

    body("img")
        .isString()
        .custom(isBase64Img),

    checkValidationError,

    async (req, res) => {
        let { name, price, isFeatured, isVegan, categoryId, img } = req.body

        if (!await fetch("SELECT 1 FROM food_categories WHERE id = ? LIMIT 1", [categoryId])) {
            return res.status(404).json({ message: "Category does not exists" })
        }

        if (await fetch("SELECT 1 FROM food_foods WHERE name = ? LIMIT 1", [name])) {
            return res.status(409).json({ message: "Food already exists" })
        }

        const { imgUrl, imgId } = await upload(img)
        
        await query("INSERT INTO food_foods (name, price, isFeatured, isVegan, categoryId, imgUrl, imgId) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, price, isFeatured, isVegan, categoryId, imgUrl, imgId])

        res.status(201).json({ message: "Food created successfully" })
    }
)

router.patch(
    "/:foodId",

    body("name")
        .trim()
        .isLength({ min: 2, max: 100 }),

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

    body("categoryId")
        .isInt()
        .toInt(),

    body("img")
        .optional()
        .isString()
        .custom(isBase64Img),

    checkValidationError,

    async (req, res) => {
        const { foodId } = req.params

        let { name, price, isFeatured, isVegan, categoryId, img } = req.body

        const food = await fetch("SELECT * FROM food_foods WHERE id = ? LIMIT 1", [foodId])

        if (!food) {
            return res.status(404).json({ message: "Food not found" })
        }

        if (await fetch("SELECT 1 FROM food_foods WHERE name = ? AND id != ? LIMIT 1", [name, foodId])) {
            return res.status(409).json({ message: "Food already exists" })
        }

        if (!await fetch("SELECT 1 FROM food_categories WHERE id = ? LIMIT 1", [categoryId])) {
            return res.status(404).json({ message: "Category does not exists" })
        }

        if (img) {
            await destroy(food.imgId)
            const { imgUrl, imgId } = await upload(img)
            food.imgUrl = imgUrl
            food.imgId = imgId
        }

        await query("UPDATE food_foods SET name = ?, price = ?, isFeatured = ?, isVegan = ?, categoryId = ?, imgUrl = ?, imgId = ? WHERE id = ?", [name, price, isFeatured, isVegan, categoryId, food.imgUrl, food.imgId, foodId])

        res.json({ message: "Food updated successfully" })
    }
)

router.delete(
    "/:foodId",

    param("foodId").isInt(),

    async (req, res) => {
        const { foodId } = req.params

        const food = await fetch("SELECT * FROM food_foods WHERE id = ? LIMIT 1", [foodId])

        if (!food) {
            return res.status(404).json({ message: "Food not found" })
        }

        await destroy(food.imgId)

        await query("DELETE FROM food_foods WHERE id = ?", [foodId])

        res.json({ message: "Food deleted successfully" })
    }
)

export default router
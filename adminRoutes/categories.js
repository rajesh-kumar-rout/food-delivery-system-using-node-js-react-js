import { Router } from "express"
import { body, param } from "express-validator"
import { query, fetch } from "../database/connection.js"
import { destroy, upload } from "../utils/cloudinary.js"
import { checkValidationError, isBase64Img } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const categories = await query("SELECT id, name, imgUrl, updatedAt, (SELECT COUNT(food_foods.id) FROM food_foods WHERE food_foods.categoryId = food_categories.id) AS totalFoods FROM food_categories ORDER BY totalFoods")
    res.json(categories)
})

router.post(
    "/",

    body("name")
        .trim()
        .isLength({ min: 2, max: 30 }),

    body("img")
        .isString()
        .custom(isBase64Img),

    checkValidationError,

    async (req, res) => {
        const { name, img } = req.body

        if (await fetch("SELECT 1 FROM food_categories WHERE name = ?", [name])) {
            return res.status(409).json({ message: "Category already exists" })
        }

        const { imgUrl, imgId } = await upload(img)

        await query("INSERT INTO food_categories (name, imgUrl, imgId) VALUES (?, ?, ?)", [name, imgUrl, imgId])

        res.status(201).json({ message: "Category created successfully" })
    }
)

router.patch(
    "/:categoryId",

    param("categoryId").isInt(),

    body("name")
        .trim()
        .isLength({ min: 2, max: 30 }),

    body("img")
        .optional()
        .isBase64()
        .custom(isBase64Img),

    async (req, res) => {
        const { categoryId } = req.params
        const { name, img } = req.body

        if (await fetch("SELECT 1 FROM food_categories WHERE id != ? AND name = ?", [categoryId, name])) {
            return res.status(409).json({ message: "Category already taken" })
        }

        const category = await fetch("SELECT * FROM food_categories WHERE id = ?", [categoryId])

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        if (img) {
            await destroy(category.imgId)
            const { imgUrl, imgId } = await upload(img)
            category.imgUrl = imgUrl
            category.imgId = imgId
        }

        await query("UPDATE food_categories SET name = ?, imgUrl = ?, imgId = ? WHERE id = ?", [name, category.imgUrl, category.imgId, categoryId])

        res.json({ message: "Category edited successfully" })
    }
)

router.delete(
    "/:categoryId",

    param("categoryId").isInt(),

    async (req, res) => {
        const { categoryId } = req.params

        const category = await fetch("SELECT * FROM food_categories WHERE id = ?", [categoryId])

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        await destroy(category.imgId)

        await query("DELETE FROM food_categories WHERE id = ?", [categoryId])

        res.json({ message: "Category deleted successfully" })
    }
)

export default router
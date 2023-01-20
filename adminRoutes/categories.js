import { Router } from "express"
import { body, param } from "express-validator"
import { checkValidationError } from "../utils/validator.js"
import knex from "../utils/database.js"

const router = Router()

router.get("/", async (req, res) => {
    const categories = await knex("foodCategories")
        .select(
            "foodCategories.id",
            "foodCategories.name",
            "foodCategories.imageUrl",
            "foodCategories.createdAt",
            "foodCategories.updatedAt",

            knex("foodFoods")
                .where("foodFoods.categoryId", "foodCategories.id")
                .count()
                .as("totalFoods")
        )
        .orderBy("totalFoods", "desc")

    res.json(categories)
})

router.post(
    "/",

    body("name").trim().isLength({ max: 30 }),

    body("imageUrl").isURL(),

    checkValidationError,

    async (req, res) => {
        const { name, imageUrl } = req.body

        const isCategoryExists = await knex("foodCategories")
            .where({ name })
            .select(1)
            .first()

        if (isCategoryExists) {
            return res.status(409).json({ message: "Category already exists" })
        }

        await knex("foodCategories").insert({
            name,
            imageUrl
        })

        res.status(201).json({ message: "Category created successfully" })
    }
)

router.patch(
    "/:categoryId",

    param("categoryId").isInt(),

    body("name").trim().isLength({ max: 30 }),

    body("imageUrl").optional().isURL(),

    async (req, res) => {
        const { categoryId } = req.params
        const { name, imageUrl } = req.body

        const category = await knex("foodCategories")
            .where({ id: categoryId })
            .first()

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        const isCategoryExists = await knex("foodCategories")
            .where({ name })
            .whereNot({ id: categoryId })
            .select(1)
            .first()

        if (isCategoryExists) {
            return res.status(409).json({ message: "Category already exists" })
        }

        await knex("foodCategories")
            .where({ id: categoryId })
            .update({
                name,
                imageUrl
            })

        res.json({ message: "Category edited successfully" })
    }
)

router.delete("/:categoryId", async (req, res) => {
    const { categoryId } = req.params

    await knex("foodCategories")
        .where({ id: categoryId })
        .del()

    res.json({ message: "Category deleted successfully" })
})

export default router
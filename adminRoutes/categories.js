import { Router } from "express"
import { body, param } from "express-validator"
import { Op } from "sequelize"
import { Category } from "../models/model.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const categories = await Category.findAll()

    res.json(categories)
})

router.post(
    "/",

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    body("imageUrl").isURL(),

    checkValidationError,

    async (req, res) => {
        const { name, imageUrl } = req.body

        if (await Category.findOne({ name })) {
            return res.status(409).json({ error: "Category already exists" })
        }

        const category = await Category.create({
            name,
            imageUrl
        })

        res.status(201).json(category)
    }
)

router.patch(
    "/:categoryId",

    param("categoryId").isInt(),

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    body("imageUrl").optional().isURL(),

    async (req, res) => {
        const { categoryId } = req.params
        const { name, imageUrl } = req.body

        const isCategoryExists = await Category.findOne({
            where: {
                [Op.and]: {
                    name,
                    id: { [Op.ne]: categoryId }
                }
            }
        })

        if (isCategoryExists) {
            return res.status(409).json({ error: "Category already exists" })
        }

        const category = await Category.findByPk(categoryId)

        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }

        category.name = name

        category.imageUrl = imageUrl

        await category.save()

        res.json(category)
    }
)

router.delete("/:categoryId", async (req, res) => {
    const { categoryId } = req.params

    const category = await Category.findByPk(categoryId)

    if (!category) {
        return res.status(404).json({ error: "Category not found" })
    }

    await category.destroy()

    res.json(category)
})

export default router
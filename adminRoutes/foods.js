import express from "express"
import { body, param } from "express-validator"
import { Op } from "sequelize"
import { Category, Food } from "../models/model.js"
import { destroy, upload } from "../utils/cloudinary.js"
import { checkValidationError } from "../utils/validator.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const foods = await Food.findAll({
        include: {
            model: Category,
            as: "category",
            attributes: ["name"]
        }
    })

    res.json(foods)
})

router.post(
    "/",

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 50 }),

    body("price").isInt().toInt(),

    body("isFeatured").isBoolean().toBoolean(),

    body("isVegan").isBoolean().toBoolean(),

    body("categoryId").isInt().toInt(),

    body("image").isString().notEmpty(),

    checkValidationError,

    async (req, res) => {
        const { name, price, isFeatured, isVegan, categoryId, image } = req.body

        if (!await Category.findByPk(categoryId)) {
            return res.status(404).json({ error: "Category does not exists" })
        }

        if (await Food.findOne({ where: { name } })) {
            return res.status(404).json({ error: "Food already exists" })
        }

        const imageRes = await upload(image)

        const food = await Food.create({
            name,
            price,
            isVegan,
            isFeatured,
            imageUrl: imageRes.url,
            imageId: imageRes.id,
            categoryId
        })

        res.status(201).json(food)
    }
)

router.patch(
    "/:foodId",

    param("foodId").isInt().toInt(),

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 50 }),

    body("price").isInt().toInt(),

    body("isFeatured").isBoolean().toBoolean(),

    body("isVegan").isBoolean().toBoolean(),

    body("categoryId").isInt().toInt(),

    checkValidationError,

    async (req, res) => {
        const { foodId } = req.params

        const { name, price, isFeatured, isVegan, categoryId, image } = req.body

        if (!await Category.findByPk(categoryId)) {
            return res.status(404).json({ error: "Category does not exists" })
        }

        const isFoodExists = await Food.findOne({
            where: {
                name,
                id: { [Op.ne]: foodId }
            }
        })

        if (isFoodExists) {
            return res.status(409).json({ error: "Food already exists" })
        }

        const food = await Food.findByPk(foodId)

        if (!food) {
            return res.status(404).json({ error: "Food not found" })
        }

        food.name = name

        food.price = price

        food.isFeatured = isFeatured

        food.isVegan = isVegan

        if (image) {
            const imageRes = await upload(image)

            await destroy(food.imageId)

            food.imageId = imageRes.id

            food.imageUrl = imageRes.url
        }

        food.categoryId = categoryId

        await food.save()

        res.json(food)
    }
)

router.delete("/:foodId", async (req, res) => {
    const { foodId } = req.params

    const food = await Food.findByPk(foodId)

    if (!food) {
        return res.status(404).json({ error: "Food not found" })
    }

    await destroy(food.imageId)

    await food.destroy()

    res.json(food)
})

export default router
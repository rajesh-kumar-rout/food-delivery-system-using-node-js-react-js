import { Router } from "express"
import { body, param } from "express-validator"
import { Op } from "sequelize"
import { Category } from "../models/model.js"
import { destroy, upload } from "../utils/cloudinary.js"
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

    body("image").isString().notEmpty(),

    checkValidationError,

    async (req, res) => {
        const { name, image } = req.body

        if (await Category.findOne({ where: {name} })) {
            return res.status(409).json({ error: "Category already exists" })
        }

        const imageRes = await upload(image)

        const category = await Category.create({
            name,
            imageUrl: imageRes.url,
            imageId: imageRes.id
        })

        res.status(201).json(category)
    }
)

router.patch(
    "/:categoryId",

    param("categoryId").isInt().toInt(),

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    async (req, res) => {
        const { categoryId } = req.params
        const { name, image } = req.body

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

        if(image){
            const imageRes = await upload(image)

            await destroy(category.imageId)

            category.imageUrl = imageRes.url 

            category.imageId = imageRes.id
        }

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

    await destroy(category.imageId)

    await category.destroy()

    res.json(category)
})

export default router
import { Router } from "express"
import { Category, Food } from "../models/model.js"

const router = Router()

router.get("/featured", async (req, res) => {
    const foods = await Food.findAll({
        where: {
            isFeatured: true
        },
        order: [
            ["id", "desc"]
        ]
    })

    res.json(foods)
})

router.get("/", async (req, res) => {
    const foods = await Food.findAll({
        order: [
            ["id", "desc"]
        ],
        include: {
            model: Category,
            as: "category",
            attributes: ["name"]
        }
    })

    res.json(foods)
})

export default router
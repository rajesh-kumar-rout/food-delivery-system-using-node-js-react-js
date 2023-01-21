import { Router } from "express"
import knex from "../utils/database.js"

const router = Router()

router.get("/featured", async (req, res) => {
    const foods = await knex("foodFoods")
        .where({ isFeatured: true })
        .select(
            "id",
            "name",
            "imageUrl",
            "price",
            "isVegan"
        )

    res.json(foods)
})

router.get("/", async (req, res) => {
    const foods = await knex("foodFoods")
        .join("foodCategories", "foodCategories.id", "foodFoods.categoryId")
        .select(
            "foodFoods.id",
            "foodFoods.name",
            "foodFoods.imageUrl",
            "foodFoods.price",
            "foodFoods.isVegan",
            "foodCategories.name AS category"
        )
        .orderBy("id", "desc")

    res.json(foods)
})

export default router
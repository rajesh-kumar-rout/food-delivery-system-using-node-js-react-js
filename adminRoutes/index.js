import { Router } from "express"
import knex from "../utils/database.js"

const router = Router()

router.get("/analytics", async (req, res) => {
    const data = await knex("foodFoods")
        .select(
            knex.raw("COUNT(foodFoods.id) AS totalFoods"),

            knex("foodCategories").count().as("totalCategories"),

            knex("foodOrders").count().as("totalOrders"),

            knex("foodOrders")
                .where("foodOrders.status", "Preparing")
                .count().as("totalPreparingOrders"),

            knex("foodOrders")
                .where("foodOrders.status", "Delivered")
                .count().as("totalDeliveredOrders")
        )
        .first()

    res.json(data)
})

export default router
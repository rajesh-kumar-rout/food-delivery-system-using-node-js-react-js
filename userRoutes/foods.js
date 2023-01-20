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
    const searchParam = req.query.search ?? null

    const query = knex("foodFoods")
        .select(
            "id",
            "name",
            "imageUrl",
            "price",
            "isVegan"
        )
        .orderBy("id", "desc")

    searchParam?.split(" ").forEach(part => {
        query.orWhere("name", "like", `%${part}%`)
    })

    const foods = await query

    res.json(foods)
})

export default router
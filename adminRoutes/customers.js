import { Router } from "express"
import knex from "../utils/database.js"

const router = Router()

router.get("/", async (req, res) => {
    const customers = await knex("foodUsers")
        .select(
            "id",
            "name",
            "email",
            "createdAt",
            "updatedAt",
        )

    res.json(customers)
})

export default router
import { Router } from "express"
import { User } from "../models/model.js"

const router = Router()

router.get("/", async (req, res) => {
    const users = await User.findAll({
        attributes: {
            exclude: ["password"]
        }
    })

    res.json(users)
})

export default router
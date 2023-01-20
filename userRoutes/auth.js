import bcrypt from "bcrypt"
import crypto from "crypto"
import { Router } from "express"
import { body } from "express-validator"
import { isAuthenticated } from "../middlewares/authentication.js"
import knex from "../utils/database.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const token = req.headers.authorization ?? null

    const user = await knex("foodTokens")
        .where({ token })
        .join("foodUsers", "foodUsers.id", "foodTokens.userId")
        .select(
            "foodUsers.id",
            "foodUsers.name",
            "foodUsers.email",
            "foodUsers.createdAt",
            "foodUsers.updatedAt",
        )
        .first()

    res.json(user)
})

router.post(
    "/login",

    body("email").isEmail(),

    body("password").notEmpty(),

    checkValidationError,

    async (req, res) => {
        const { email, password } = req.body

        const user = await knex("foodUsers")
            .where({ email })
            .first()

        if (!(user && await bcrypt.compare(password, user.password))) {
            return res.status(422).json({ error: "Invalid email or password" })
        }

        const token = crypto.randomUUID()

        await knex("foodTokens").insert({
            userId: user.id,
            token
        })

        res.json({ token })
    }
)

router.post(
    "/register",

    body("name").trim().isLength({ max: 30 }),

    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .isLength({ max: 30 }),

    body("password").isLength({ min: 6, max: 20 }),

    checkValidationError,

    async (req, res) => {
        const { name, password, email } = req.body

        const isEmailExists = await knex("foodUsers")
            .where({ email })
            .select(1)
            .first()

        if (isEmailExists) {
            return res.status(409).json({ error: "Email already exists" })
        }

        const [userId] = await knex("foodUsers").insert({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })

        const token = crypto.randomUUID()

        await knex("foodTokens").insert({
            userId,
            token
        })

        res.json({ token })
    }
)

router.patch(
    "/edit-account",

    isAuthenticated,

    body("name").trim().isLength({ max: 30 }),

    body("email")
        .isEmail()
        .normalizeEmail()
        .isLength({ max: 30 }),

    checkValidationError,

    async (req, res) => {
        const { name, email } = req.body

        const { currentUserId } = req

        const isEmailExists = await knex("foodUsers")
            .where({ email })
            .whereNot({ id: currentUserId })
            .select(1)
            .first()

        if (isEmailExists) {
            return res.status(409).json({ error: "Email already exists" })
        }

        await knex("foodUsers")
            .where({ id: currentUserId })
            .update({
                name,
                email
            })

        res.json({ success: "Account edited successfully" })
    }
)

router.patch(
    "/change-password",

    isAuthenticated,

    body("oldPassword").notEmpty(),

    body("newPassword").isLength({ min: 6, max: 20 }),

    checkValidationError,

    async (req, res) => {
        const { oldPassword, newPassword } = req.body

        const { currentUserId } = req

        const user = await knex("foodUsers")
            .where({ id: currentUserId })
            .first()

        if (!await bcrypt.compare(oldPassword, user.password)) {
            return res.status(422).json({ error: "Old password does not match" })
        }

        await knex("foodUsers")
            .where({ id: currentUserId })
            .update({
                password: await bcrypt.hash(newPassword, 10)
            })

        res.json({ success: "Password changed successfully" })
    }
)

router.delete("/logout", isAuthenticated, async (req, res) => {
    const token = req.headers.authorization ?? null

    await knex("foodTokens")
        .where({ token })
        .del()

    res.json({ success: "Logout successfully" })
})

export default router
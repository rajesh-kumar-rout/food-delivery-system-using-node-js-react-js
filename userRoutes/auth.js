import { Router } from "express"
import { body } from "express-validator"
import { query, fetch } from "../database/connection.js"
import { checkValidationError } from "../utils/validator.js"
import bcrypt from "bcrypt"
import { authenticate } from "../middlewares/authentication.js"
import crypto from "crypto"

const router = Router()

router.get("/", async (req, res) => {
    const { userId } = req.session

    const user = await fetch("SELECT id, name, email FROM food_users WHERE id = ? LIMIT 1", [userId])

    const csrfToken = crypto.randomUUID()
    req.session.csrfToken = csrfToken
    req.session.save()

    res.cookie("XSRF-TOKEN", csrfToken).json(user)
})

router.post(
    "/login",

    body("email").isEmail(),

    body("password").notEmpty(),

    checkValidationError,

    async (req, res) => {
        const { email, password } = req.body

        const user = await fetch("SELECT * FROM food_users WHERE email = ? LIMIT 1", [email])

        if (!(user && await bcrypt.compare(password, user.password))) {
            return res.status(422).json({ message: "Invalid email or password" })
        }

        req.session.userId = user.id
        req.session.isAdmin = user.isAdmin
        req.session.save()

        res.json({ message: "Login successfull" })
    }
)

router.post(
    "/register",

    body("name")
        .trim()
        .isLength({ min: 2, max: 30 }),

    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .isLength({ max: 30 }),

    body("password").isLength({ min: 6, max: 20 }),

    checkValidationError,

    async (req, res) => {
        const { name, password, email } = req.body

        if (await fetch("SELECT 1 FROM food_users WHERE email = ? LIMIT 1", [email])) {
            return res.status(409).json({ message: "Email already exists" })
        }

        const { insertId } = await query("INSERT INTO food_users (name, email, password) VALUES (?, ?, ?)", [name, email, await bcrypt.hash(password, 10)])

        req.session.userId = insertId

        res.json({ message: "Register successfull" })
    }
)

router.patch(
    "/edit-account",

    authenticate,

    body("name")
        .trim()
        .isLength({ min: 2, max: 30 }),

    body("email")
        .isEmail()
        .normalizeEmail()
        .isLength({ max: 30 }),

    checkValidationError,

    async (req, res) => {
        const { name, email } = req.body

        const { userId } = req.session

        await query("UPDATE food_users SET name = ?, email = ? WHERE id = ?", [name, email, userId])

        res.json({ message: "Account edited successfully" })
    }
)

router.patch(
    "/change-password",

    authenticate,

    body("oldPassword").notEmpty(),

    body("newPassword").isLength({ min: 6, max: 20 }),

    checkValidationError,

    async (req, res) => {
        const { oldPassword, newPassword } = req.body

        const { userId } = req.session

        const user = await fetch("SELECT * FROM food_users WHERE id = ? LIMIT 1", [userId])

        if (!await bcrypt.compare(oldPassword, user.password)) {
            return res.status(422).json({ message: "Old password does not match" })
        }

        await query("UPDATE food_users SET password = ? WHERE id = ?", [await bcrypt.hash(newPassword, 10), userId])

        res.json({ message: "Password changed successfully" })
    }
)

router.delete("/logout", authenticate, async (req, res) => {
    req.session.destroy()
    res.json({ message: "Logout successfully" })
})

export default router
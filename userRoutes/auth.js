import bcrypt from "bcrypt"
import { Router } from "express"
import { body } from "express-validator"
import jwt from "jsonwebtoken"
import { Op } from "sequelize"
import { isAuthenticated } from "../middlewares/authentication.js"
import { User } from "../models/model.js"
import { checkValidationError } from "../utils/validator.js"

const router = Router()

router.get("/", async (req, res) => {
    const { _id } = req 

    const user = await User.findOne({
        where: {
            id: _id
        },
        attributes: {
            exclude: ["password"]
        }
    })

    res.json(user)
})

router.post(
    "/login",

    body("email").isEmail(),

    body("password").notEmpty(),

    checkValidationError,

    async (req, res) => {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!(user && await bcrypt.compare(password, user.password))) {
            return res.status(422).json({ error: "Invalid email or password" })
        }

        const authToken = jwt.sign(
            {
                _id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.AUTH_TOKEN_SECRECT,
            {
                expiresIn: "72h"
            }
        )

        res.json({ authToken })
    }
)

router.post(
    "/register",

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .isLength({ max: 30 }),

    body("password").isLength({ min: 6, max: 20 }),

    checkValidationError,

    async (req, res) => {
        const { name, password, email } = req.body

        if (await User.findOne({ where: { email } })) {
            return res.status(409).json({ error: "Email already exists" })
        }

        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })

        const authToken = jwt.sign(
            {
                _id: user.id,
                isAdmin: false
            },
            process.env.AUTH_TOKEN_SECRECT,
            {
                expiresIn: "72h"
            }
        )

        res.json({ authToken })
    }
)

router.patch(
    "/edit-profile",

    isAuthenticated,

    body("name")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 30 }),

    body("email")
        .trim()
        .normalizeEmail()
        .isEmail()
        .isLength({ max: 30 }),

    checkValidationError,

    async (req, res) => {
        const { name, email } = req.body

        const { _id } = req

        const isEmailExists = await User.findOne({
            where: {
                [Op.and]: {
                    email,
                    id: {[Op.ne]: _id}
                }
            }
        })

        if (isEmailExists) {
            return res.status(409).json({ error: "Email already exists" })
        }

        const user = await User.findByPk(_id)

        user.email = email

        user.name = name

        await user.save()

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

        const { _id } = req

        const user = await User.findByPk(_id)

        if (!await bcrypt.compare(oldPassword, user.password)) {
            return res.status(422).json({ error: "Old password does not match" })
        }

        user.password = await bcrypt.hash(newPassword, 10)

        await user.save()

        res.json({ success: "Password changed successfully" })
    }
)

export default router
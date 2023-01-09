import { validationResult } from "express-validator"

export const isBase64Img = (value) => {
    console.log(value.startsWith("data:image/jpeg"));
    return value.startsWith("data:image/jpeg") || value.startsWith("data:image/png")
}

export const checkValidationError = (req, res, next) => {
    const errors = validationResult(req).array()

    if (errors.length) {
        return res.status(422).json(errors)
    }

    next()
}


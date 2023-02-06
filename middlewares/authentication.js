import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export async function authenticate(req, res, next) {
    let { authorization } = req.headers 

    if(authorization && authorization.startsWith("Bearer ")) {
        authorization = authorization.substring(7, authorization.length)
    }

    try {
        
        const { _id, isAdmin } = jwt.verify(authorization, process.env.AUTH_TOKEN_SECRECT)

        req._id = _id 

        req.isAdmin = isAdmin 

    } catch {
        
        req._id = null
    }

    next()
}

export async function isAuthenticated(req, res, next) {
    if (!req._id) {
        return res.status(401).json({ error: "Authentication failed" })
    }

    next()
}

export async function isAdmin(req, res, next) {
    if (!req.isAdmin) {
        return res.status(401).json({ error: "Authentication failed" })
    }

    next()
}

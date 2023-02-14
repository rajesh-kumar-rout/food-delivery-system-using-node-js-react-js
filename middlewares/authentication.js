import jwt from "jsonwebtoken"

export async function authenticate(req, res, next) {
    const authorization = req.headers.authorization

    const token = authorization && authorization.startsWith("Bearer ") ? authorization.substring(7, authorization.length) : null

    try {
        const { _id, isAdmin } = jwt.verify(token, process.env.AUTH_TOKEN_SECRECT)

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
        return res.status(403).json({ error: "Access denied" })
    }

    next()
}

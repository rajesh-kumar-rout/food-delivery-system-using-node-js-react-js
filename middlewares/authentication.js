import { config } from "dotenv"

config()

export async function authenticate(req, res, next) {
    console.log(req.session.userId);
    req.session.userId ? next() : res.status(401).json({ message: "Session expired or not set" })
}

export async function isAdmin(req, res, next) {
    req.session.isAdmin ? next() : res.status(403).json({ message: "Access denied" })
}

export async function verifyCsrf(req, res, next) {
    if (req.method !== "GET" && req.headers['x-xsrf-token'] !== req.session.csrfToken) {
        return res.status(403).json({ message: "Access denied" })
    }

    next()
}

import express from "express"
import adminCategories from "./adminRoutes/categories.js"
import adminDeliveryBoys from "./adminRoutes/deliveryBoys.js"
import adminSliders from "./adminRoutes/sliders.js"
import adminSettings from "./adminRoutes/settings.js"
import adminFoods from "./adminRoutes/foods.js"
import adminOrders from "./adminRoutes/orders.js"
import adminindex from "./adminRoutes/index.js"
import adminCustomers from "./adminRoutes/customers.js"
import userCategories from "./userRoutes/categories.js"
import userFoods from "./userRoutes/foods.js"
import userSliders from "./userRoutes/sliders.js"
import userCart from "./userRoutes/cart.js"
import userAccount from "./userRoutes/auth.js"
import userOrders from "./userRoutes/orders.js"
import cors from "cors"
import expressMysqlSession from "express-mysql-session"
import session from "express-session"
import { config } from "dotenv"
import { authenticate, isAdmin, verifyCsrf } from "./middlewares/authentication.js"
import { pool } from "./database/connection.js"

const app = express()
config()
const MysqlStore = expressMysqlSession(session)
const sessionStore = new MysqlStore({}, pool)

app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
    allowedHeaders: ['X-XSRF-TOKEN', 'Content-Type']
}))
app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        secure: false,
        expires: new Date(Date.now() + 9000000000)
    }
}))
app.use(verifyCsrf)

app.use("/api/admin/categories", authenticate, isAdmin, adminCategories)
app.use("/api/admin/delivery-agents", authenticate, isAdmin, adminDeliveryBoys)
app.use("/api/admin/sliders", authenticate, isAdmin, adminSliders)
app.use("/api/admin/settings", authenticate, isAdmin, adminSettings)
app.use("/api/admin/foods", authenticate, isAdmin, adminFoods)
app.use("/api/admin/orders", authenticate, isAdmin, adminOrders)
app.use("/api/admin/customers", authenticate, isAdmin, adminCustomers)
app.use("/api/admin", authenticate, isAdmin, adminindex)

app.use("/api/categories", userCategories)
app.use("/api/foods", userFoods)
app.use("/api/sliders", userSliders)
app.use("/api/orders", authenticate, userOrders)
app.use("/api/cart", userCart)
app.use("/api/auth", userAccount)

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
})
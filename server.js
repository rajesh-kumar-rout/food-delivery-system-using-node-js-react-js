
import cors from "cors"
import { config } from "dotenv"
import express from "express"
import adminCategories from "./adminRoutes/categories.js"
import adminCustomers from "./adminRoutes/customers.js"
import adminDeliveryAgents from "./adminRoutes/deliveryAgents.js"
import adminFoods from "./adminRoutes/foods.js"
import adminindex from "./adminRoutes/index.js"
import adminOrders from "./adminRoutes/orders.js"
import adminSettings from "./adminRoutes/settings.js"
import adminSliders from "./adminRoutes/sliders.js"
import { authenticate, isAdmin, isAuthenticated } from "./middlewares/authentication.js"
import userAccount from "./userRoutes/auth.js"
import userCart from "./userRoutes/cart.js"
import userCategories from "./userRoutes/categories.js"
import userFoods from "./userRoutes/foods.js"
import userOrders from "./userRoutes/orders.js"
import userSliders from "./userRoutes/sliders.js"

config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(authenticate)

app.use("/api/admin/categories", isAuthenticated, isAdmin, adminCategories)
app.use("/api/admin/delivery-agents", isAuthenticated, isAdmin, adminDeliveryAgents)
app.use("/api/admin/sliders", isAuthenticated, isAdmin, adminSliders)
app.use("/api/admin/settings", isAuthenticated, isAdmin, adminSettings)
app.use("/api/admin/foods", isAuthenticated, isAdmin, adminFoods)
app.use("/api/admin/orders", isAuthenticated, isAdmin, adminOrders)
app.use("/api/admin/customers", isAuthenticated, isAdmin, adminCustomers)
app.use("/api/admin", isAuthenticated, isAdmin, adminindex)

app.use("/api/categories", userCategories)
app.use("/api/foods", userFoods)
app.use("/api/sliders", userSliders)
app.use("/api/orders", isAuthenticated, userOrders)
app.use("/api/cart", isAuthenticated, userCart)
app.use("/api/auth", userAccount)

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
})
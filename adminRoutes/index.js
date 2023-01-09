import { Router } from "express"
import { fetch } from "../database/connection.js"

const router = Router()

router.get("/analytics", async (req, res) => {
    const data = await fetch("SELECT (SELECT COUNT(food_foods.id) FROM food_foods) AS totalFoods, (SELECT COUNT(food_categories.id) FROM food_categories) AS totalCategories, (SELECT COUNT(food_users.id) FROM food_users WHERE users.isDeliveryBoy = TRUE) AS totalDeliveryBoys, (SELECT COUNT(food_orders.id) FROM food_orders) AS totalOrders, (SELECT COUNT(food_users.id) FROM food_users) AS totalCustomers, (SELECT SUM(food_payment_details.totalPrice + food_payment_details.deliveryFee + (food_payment_details.totalPrice * (food_payment_details.gstPercentage / 100))) FROM food_payment_details) AS totalEarned")
    res.json(data)
})

export default router
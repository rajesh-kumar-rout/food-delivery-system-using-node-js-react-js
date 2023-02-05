import { Router } from "express"
import { Category, Food, Order, Slider } from "../models/model.js"

const router = Router()

router.get("/analytics", async (req, res) => {
    const totalCategories = await Category.count()

    const totalSliders = await Slider.count()

    const totalFoods = await Food.count()

    const totalOrders = await Order.count()

    const totalPreparingOrders = await Order.count({
        where: {
            status: "Pending"
        }
    })

    const toalalPrepredOrders = await Order.count({
        where: {
            status: "Prepared"
        }
    })

    const totalDeliveredOrders = await Order.count({
        where: {
            status: "Delivered"
        }
    })

    res.json({
        totalCategories,
        totalSliders,
        totalFoods,
        totalOrders,
        totalPreparingOrders,
        toalalPrepredOrders,
        totalDeliveredOrders
    })
})

export default router
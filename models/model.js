import Category from "./category.js"
import Food from "./food.js"
import Order from "./order.js"
import OrderedFood from "./orderedFood.js"
import DeliveryAddress from "./deliveryAddress.js"
import User from "./user.js"
import Cart from "./cart.js"
import PaymentDetails from "./paymentDetails.js"
import Slider from "./slider.js"
import Setting from "./setting.js"
import sequelize from "../utils/sequelize.js"

Category.hasMany(Food, {
    foreignKey: "categoryId",
    onDelete: "cascade",
    onUpdate: "cascade"
})

Food.belongsTo(Category, {
    foreignKey: "categoryId"
})

User.hasMany(Cart, {
    foreignKey: "userId",
    onDelete: "cascade",
    onUpdate: "cascade"
})

Cart.belongsTo(User, {
    foreignKey: "userId"
})

Food.hasMany(Cart, {
    foreignKey: "foodId",
    onDelete: "cascade",
    onUpdate: "cascade"
})

Cart.belongsTo(Food, {
    foreignKey: "foodId",
    as: "food"
})

Order.Foods = Order.hasMany(OrderedFood, {
    foreignKey: "orderId",
    onDelete: "cascade",
    onUpdate: "cascade",
    as: "foods"
})

OrderedFood.belongsTo(Order, {
    foreignKey: "orderId"
})

Order.DeliveryAddress = Order.hasOne(DeliveryAddress, {
    foreignKey: "orderId",
    onDelete: "cascade",
    onUpdate: "cascade",
    as: "deliveryAddress"
})

DeliveryAddress.belongsTo(Order, {
    foreignKey: "orderId"
})

User.hasMany(Order, {
    foreignKey: "deliveryAgentId"
})

Order.belongsTo(User, {
    foreignKey: "userId"
})

Order.PaymentDetails = Order.hasOne(PaymentDetails, {
    foreignKey: "orderId",
    onDelete: "cascade",
    onUpdate: "cascade",
    as: "paymentDetails"
})

PaymentDetails.belongsTo(Order, {
    foreignKey: "orderId"
})

export {
    Category,
    Food,
    User,
    Cart,
    Order,
    OrderedFood,
    DeliveryAddress,
    PaymentDetails,
    Slider,
    Setting
}

// sequelize.sync({ force: true })
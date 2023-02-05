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

Category.hasMany(Food)

Food.belongsTo(Category)

User.hasMany(Cart)

Cart.belongsTo(User)

Cart.belongsTo(Food)

User.hasMany(Order)

Order.belongsTo(User)

Order.hasMany(OrderedFood)

OrderedFood.belongsTo(Order)

Order.hasOne(DeliveryAddress)

Order.belongsTo(User, {
    foreignKey: "deliveryAgentId"
})

DeliveryAddress.belongsTo(Order)

Order.hasOne(PaymentDetails)

PaymentDetails.belongsTo(Order)

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
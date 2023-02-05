import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize.js"

export default sequelize.define("PaymentDetails", {
    foodPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deliveryFee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gstAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gstPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
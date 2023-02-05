import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize.js"

export default sequelize.define("Setting", {
    deliveryFee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gstPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
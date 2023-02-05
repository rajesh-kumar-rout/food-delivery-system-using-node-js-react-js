import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize.js"

export default sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isDeliveryAgent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
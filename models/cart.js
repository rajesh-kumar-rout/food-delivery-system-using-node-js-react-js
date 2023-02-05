import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize.js"

export default sequelize.define("Cart", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
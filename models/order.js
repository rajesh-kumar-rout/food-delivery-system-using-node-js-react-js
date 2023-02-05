import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize.js"

export default sequelize.define("Order", {
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
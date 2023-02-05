import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize.js"

export default sequelize.define("DeliveryAddress", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instruction: {
        type: DataTypes.STRING
    }
})
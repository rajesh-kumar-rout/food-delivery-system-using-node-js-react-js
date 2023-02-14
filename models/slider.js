import { DataTypes } from "sequelize"
import sequelize from "../utils/sequelize.js"

export default sequelize.define("Slider", {
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
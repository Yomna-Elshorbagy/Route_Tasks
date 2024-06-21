import { DataTypes } from "sequelize";
import sequelize from "../connection.js";


const userModel = sequelize.define('user',{
    username:{
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

export default userModel;
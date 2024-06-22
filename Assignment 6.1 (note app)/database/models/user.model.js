import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";


const userModel = sequelize.define('user', {
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull: false
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull: false
    } 
});
export default userModel;
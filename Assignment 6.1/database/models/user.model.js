import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";


const userModel = sequelize.define('user', {
    name:{
        type: DataTypes.STRING(200)
    }, 
});
export default userModel;
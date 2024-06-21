import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
import userModel from './user.model.js';

const postsModel = sequelize.define('posts', {
    tittle:{
        type: DataTypes.STRING(200)
    }
});


// one to many Relationship :
userModel.hasMany(postsModel)
postsModel.belongsTo(userModel)
export default postsModel;
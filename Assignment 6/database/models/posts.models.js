import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import userModel from "./users.model.js";

const postsModel = sequelize.define('post', {
    title:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    content:{
        type: DataTypes.STRING(1000),
        allowNull: false,
        unique: true,
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

userModel.hasMany(postsModel,{
    onDelete: 'CASCADE',
    onUpdate:'CASCADE',
    foreignKey: 'author'
})
postsModel.belongsTo(userModel,{
    foreignKey: 'author'
});



export default postsModel;
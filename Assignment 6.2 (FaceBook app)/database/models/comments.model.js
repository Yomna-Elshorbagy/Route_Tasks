import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import userModel from "./users.model.js";
import postsModel from "./posts.models.js";

const commentsModel = sequelize.define('comment', {
    content:{
        type:DataTypes.STRING(1000),
        allowNull: false
    }
});

commentsModel.belongsTo(userModel, { foreignKey: 'userId' });
userModel.hasMany(commentsModel);
commentsModel.belongsTo(postsModel, { foreignKey: 'postId' });
postsModel.hasMany(postsModel);

export default commentsModel;
import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
import userModel from './user.model.js';

const notesModel = sequelize.define('note', {
    tittle:{
        type: DataTypes.STRING(200)
    },
    description:{
        type: DataTypes.STRING(200)
    }
});


// one to many Relationship :
userModel.hasMany(notesModel)
notesModel.belongsTo(userModel)
export default notesModel;
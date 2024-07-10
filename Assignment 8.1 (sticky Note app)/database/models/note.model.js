import mongoose from "mongoose";

//Schema:
let noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim:true,
        maxlength:50,
    },
    description:{
        type:String,
        required: true,
    },
    user:{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'User' ,
       required: true,
    }
    },{
        timestamps:true,
        versionKey:false
    });

//model:
const noteModel = mongoose.model('Note', noteSchema);

export default noteModel;
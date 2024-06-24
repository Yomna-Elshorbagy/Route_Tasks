import mongoose from "mongoose";

//Schema:
let userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        trim:true,
        maxlength:50,
    },
    age:{
        type:Number,
        min:10
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
    },
    isActive:{ 
        type: Boolean, 
        default: true 
    },
    status:{
        type: String,
        enum: ['online', 'offline'],
        default: ['offline']
    }
    },{
        timestamps:true
    });

//model:
const userModel = mongoose.model('User', userSchema);

export default userModel;
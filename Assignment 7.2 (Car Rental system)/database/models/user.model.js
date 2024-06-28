import mongoose from "mongoose";

//Schema:
let userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        trim:true,
        maxlength:50,
    },
    phoneNo:{
        type:String,
        maxlength:11,
        minlength:11,
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
        default: 'offline'
    },
    role: { 
        type: String,
        enum: ['customer', 'owner', 'manager', 'employee'],
        default: 'customer' },
    },{
        timestamps:true,
        versionKey:false
    });

//model:
const userModel = mongoose.model('User', userSchema);

export default userModel;
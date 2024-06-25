import mongoose from "mongoose";

//Schema:
let trainerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true,
        maxlength:50,
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
    salary:{
        type:Number,
        required: true,
    },
    start_time: { 
        type: Date,
        required: true 
    },
    end_time: { 
        type: Date,
        required: true 
    },
    },{
        timestamps:true
    });

//model:
const trainerModel = mongoose.model('Trainer', trainerSchema);

export default trainerModel;
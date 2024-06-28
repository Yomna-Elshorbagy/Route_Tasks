import mongoose from "mongoose";

//Schema:
let carSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true,
        maxlength:50,
    },
    model:{
        type:String,
        required: true,
        trim:true,
    },
    rentalStatus:{
        type: String,
        enum: ['available', 'rented'],
        default: 'available'
    }
    },{
        timestamps:true,
        versionKey:false
    });

//model:
const carModel = mongoose.model('Car', carSchema);

export default carModel;
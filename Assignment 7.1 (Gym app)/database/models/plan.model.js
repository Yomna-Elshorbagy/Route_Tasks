import mongoose from "mongoose";

let planSchema = new mongoose.Schema({
  title:{
    type:String,
    maxLength:20,
    required: true,
    trim:true,
    unique: true,
  } ,
  description: {
    type:String,
    required: true,
  },
  fee: {
    type:Number,
    required: true,
  },
  features:String
},
{
    timestamps: true
});

const planModel = mongoose.model("Plan", planSchema);

export default planModel;
import mongoose from "mongoose";

let bookSchema = new mongoose.Schema({
   title:{
    type: String,
    required: true,
    trim:true,
    maxlength:50,
    index: true
   },
   content:{
    type: String,
    required: true,
   },
   author:{
    type: String,
    required: true,
   },
   publishedDate:{
    type: Date,
    default: Date.now
   }
},{
    timestamps:true,
    versionKey:false
});

let bookModel = mongoose.model('Book', bookSchema);

export default bookModel;
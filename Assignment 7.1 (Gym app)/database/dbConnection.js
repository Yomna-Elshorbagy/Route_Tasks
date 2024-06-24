import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const initconnection = () => {
mongoose.connect('mongodb://localhost:27017/newApp')
.then(()=>{console.log('Db connected succesfully..');})
.catch((err)=>{console.log('Error connecting',  err);})
};

export default initconnection;
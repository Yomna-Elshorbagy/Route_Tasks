
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const dbConn = ()=>{
    mongoose.connect(process.env.mongoose_Uri)
.then(()=>{console.log('Db connected succesfully..');})
.catch((err)=>{console.log('Error connecting',  err);})
}
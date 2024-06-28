import detenv from "dotenv";
import mongoose from "mongoose";

detenv.config();

const initconnection =()=>{
    mongoose.connect(process.env.mongoose_Uri)
.then(()=>{console.log('Db connected succesfully..');})
.catch((err)=>{console.log('Error connecting',  err);})
}


export default initconnection;
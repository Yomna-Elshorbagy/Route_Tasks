//handel programming Error:
process.on('uncaughtException',(err)=>{
    console.log('ERROR in code: ', err);
});

import express, { json } from 'express';
import { dbConnection } from './database/dbConnection.js';
import userRouter from './src/modules/user/user.routers.js';
import massageRouter from './src/modules/massage/massage.routes.js';
import cors from "cors";
import { AppError } from './src/utils/catchError.js';
import { globalError } from './src/utils/globalError.js';

const app = express();
const port =process.env.PORT || 3000;

app.use(json());
app.use(cors());
dbConnection()

app.use('/auth',userRouter)
app.use('/massage',massageRouter)

//handel Error Path
app.use('*', (req,res,next)=>{
    next (new AppError (`Route Not Found ${req.originalUrl}`, 404))
});
app.use(globalError);

//handel express error:
process.on('unhandledRejection', (err)=>{
    console.log('ERROR: ', err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
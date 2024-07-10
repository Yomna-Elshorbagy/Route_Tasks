process.on('uncaughtException',(err)=>{
    console.log('ERROR in code: ', err);
});

import express from 'express';
import cors from 'cors';
import { dbConn } from './database/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';
import noteRouter from './src/modules/note/note.routers.js';

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());
dbConn();


app.use('/auth',userRouter);
app.use('/note',noteRouter);

app.use('*', (req,res,next)=>{
    res.status(404).json({message: `Route Not Found ${req.originalUrl}`})
});

process.on('unhandledRejection', (err)=>{
    console.log('ERROR: ', err);
});
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
import express from 'express';
import 'dotenv/config'; 
import sequelize from './database/dbConnection.js';
import postRouter from './modules/posts/posts.routes.js';
import userRouter from './modules/users/users.routes.js';
import cors from 'cors'
const server = express();
const port = process.env.port || 3000;

server.use(express.json());
server.use(cors());

// migration : 
sequelize.sync()


server.use('/', postRouter);
server.use('/', userRouter);


server.listen(port, () => console.log(`Example app listening on port ${port}!`))
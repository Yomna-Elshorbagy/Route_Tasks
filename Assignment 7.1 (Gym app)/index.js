import express from 'express';
import cors from 'cors';
import initconnection from './database/dbConnection.js';
import userRouter from './src/modules/user/user.routes.js';
import planRouter from './src/modules/plan/plan.routes.js';
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cors());

initconnection();
app.use('/user', userRouter);
app.use('/plan', planRouter);
app.use('/reserve', planRouter);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
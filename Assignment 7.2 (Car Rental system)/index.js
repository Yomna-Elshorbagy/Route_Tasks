import express from 'express';
import cors from "cors";
import initconnection from './database/dbConnection.js';
import customerRouter from './src/modules/customer/customer.router.js';
import carRouter from './src/modules/car/car.routers.js';
import rentalRouter from './src/modules/rental/rental.routers.js';

const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cors())
initconnection();

app.use('/customer', customerRouter);
app.use('/car', carRouter)
app.use('/rental', rentalRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
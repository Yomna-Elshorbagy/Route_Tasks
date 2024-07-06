import express from 'express';
import { db } from './databases/dbConnection.js';
import cors from'cors';
import userRoter from './modules/users/user.routes.js';
import carRouter from './modules/car/car.routes.js';
import rentalRouter from './modules/rental/rental.routes.js';

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

server.use('/users', userRoter)
server.use('/cars', carRouter)
server.use('/rental', rentalRouter)

//   //explicit
//   db.createCollection('users');
//   //implicite
//   db.collection('users').insertOne({name : 'yomna', age: 27, phone :123456})

//   db.collection('users').insertMany([
//     {name : 'ahmed', age: 25, phone :456789},
//     {name : 'omar', age: 20, phone :456321},
//      ])
  
//   db.collection('users').drop()

server.get('/', (req, res) => res.send('Hello World!'))
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
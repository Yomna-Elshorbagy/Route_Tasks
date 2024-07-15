import express from 'express';
import { dbConn } from './database/dbConnection.js';
import authorRouter from './src/modules/author/author.routes.js';
import bookRouter from './src/modules/books/books.routes.js';
const app = express()
const port = process.env.port ||3000

app.use(express.json());
dbConn();

app.use('/author',authorRouter)
app.use('/book',bookRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
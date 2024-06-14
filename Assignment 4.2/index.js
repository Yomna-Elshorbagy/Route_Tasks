import express from 'express';
import userRouter from './moduels/users/users.routes.js';
import postsRouter from './moduels/posts/posts.routes.js';

const server = express();
const port = 5000;
server.use(express.json());

server.use(userRouter)
server.use(postsRouter)

server.listen(port, () => console.log(`DB connected on port ${port}!`))
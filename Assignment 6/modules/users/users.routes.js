import express from 'express';
import { getAllUsers, getUserPostAndComments, logIn, logout, signup } from './users.controlers.js';

const userRouter = express.Router();

userRouter.post('/signup', signup )
userRouter.post('/login', logIn)
userRouter.post('/logout',logout )
userRouter.get('/', getAllUsers)
userRouter.get('/:userId/:postId', getUserPostAndComments);


export default userRouter;

import express from 'express';
import { deleteUser, getAllUsers, getUserPostAndComments, logIn, logout, signup, updateUser } from './users.controlers.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', logIn);
userRouter.put('/:id',updateUser)
userRouter.delete('/:id',deleteUser);
userRouter.get('/', getAllUsers);
userRouter.post('/logout',logout);
userRouter.get('/:userId/:postId', getUserPostAndComments);


export default userRouter;

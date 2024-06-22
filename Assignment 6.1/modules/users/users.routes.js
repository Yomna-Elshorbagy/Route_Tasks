import express from 'express';
import { deleteUser, getAllUsers, logIn, signUp, updateUser } from './users.controllers.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers)
userRouter.post('/logIn',logIn)
userRouter.post('/signUp', signUp)
userRouter.put('/:id',updateUser )
userRouter.delete('/:id',deleteUser)

export default userRouter;

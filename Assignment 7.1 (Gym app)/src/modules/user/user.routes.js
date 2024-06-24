import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, logIn, signUp, updateUser } from "./user.controllers.js";

const userRouter = Router();

userRouter.get('/',getAllUsers);
userRouter.post('/signUp',signUp);
userRouter.post('/logIn',logIn);
userRouter.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);


export default userRouter;
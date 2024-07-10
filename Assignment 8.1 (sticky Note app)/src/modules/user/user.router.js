import { Router } from "express";
import { deleteuser, getAllusers, getuserById, logIn, signUp, updateuser, verifyEmail, verifyOtp } from "./user.controlers.js";

const userRouter = Router();

userRouter.get('/',getAllusers);
userRouter.post('/signUp',signUp);
userRouter.post('/logIn',logIn);
userRouter.route('/:id')
.get(getuserById)
.put(updateuser)
.delete(deleteuser);
userRouter.post('/verifyOtp', verifyOtp);
userRouter.get('/verify/:token', verifyEmail)

export default userRouter;
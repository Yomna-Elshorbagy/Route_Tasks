import { Router } from "express";
import { resetPassword, signin, signup } from "./users.controlers.js";
//import * as usercontroller from "./users.controlers.js";
import { checEmailExist } from "../../middlewares/checkEmail.js";
const userRouter = Router();


userRouter.post('/signup',checEmailExist, signup);
userRouter.post('/signin', signin);
userRouter.patch('/resetPassword', resetPassword);

//use this way if i import * : 
// userRouter.post('/signin', usercontroller.signin);

export default userRouter;

import { Router } from "express";
import * as userController from './user.controllers.js'
import { validate } from "../../midelwares/validate.js";
import { signinVal, signupVal, updateVal } from "./user.validation.js";
const userRouter = Router();

userRouter.get('/',userController.getAllUsers);
userRouter.post('/signUp',validate(signupVal),userController.signUp);
userRouter.post('/logIn',validate(signinVal),userController.logIn);

userRouter.route('/:id')
.get(userController.getUserById)
.put(validate(updateVal),userController.updateUser)
.delete(userController.deleteUser);

userRouter.post('/verifyOtp',userController.verifyOtp );
userRouter.get('/verify/:token',userController.verifyEmail );

export default userRouter;
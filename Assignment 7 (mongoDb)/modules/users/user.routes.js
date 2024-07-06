import { Router } from "express";
import * as userControllers from "./user.controller.js"


const userRoter = Router();

userRoter.get('/', userControllers.getAllUsers)
userRoter.post('/', userControllers.adduser)
userRoter.route('/:id')
.put(userControllers.updatUser)
.delete(userControllers.deleteUser)
.get(userControllers.getUserById)


export default userRoter;
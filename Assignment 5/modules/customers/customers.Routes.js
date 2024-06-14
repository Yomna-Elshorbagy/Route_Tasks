import { Router } from "express";
import { signin, signup } from "./customers.controllers.js";
import { emailCheck } from "../../midllware/emailcheck.js";

const customerRouter = Router();

customerRouter.post('/signup',emailCheck, signup);
customerRouter.post('/signin', signin);


export default customerRouter;
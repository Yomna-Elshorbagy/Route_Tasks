import { Router } from "express";
import { deleteCustomer, getAllCustomers, getCustomerById, logIn, resetPassword, signUp, updateCustomer } from "./customer.controllers.js";
import { isOwner } from "../../midlewares/isOwner.js";

const customerRouter = Router();

customerRouter.route('/')
.get(getAllCustomers)
.put(resetPassword);
customerRouter.post('/signUp',signUp);
customerRouter.post('/logIn',logIn);
customerRouter.route('/:id')
.get(getCustomerById)
.put(isOwner,updateCustomer)
.delete(isOwner, deleteCustomer);


export default customerRouter;
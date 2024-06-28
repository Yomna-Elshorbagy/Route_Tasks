import { Router } from "express";
import { DeleteRental, createRental, getAllrentals, getrentalById, updateRental } from "./rental.controllers.js";


const rentalRouter = Router();

rentalRouter.route('/')
.get(getAllrentals)
.post(createRental)

rentalRouter.route('/:rentalId')
.get(getrentalById)
.put(updateRental)
.delete(DeleteRental)



export default rentalRouter;
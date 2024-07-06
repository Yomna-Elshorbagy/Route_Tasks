import { Router } from "express";
import * as rentelControllers from "./rental.controllers.js"


const rentalRouter = Router();

rentalRouter.route('/')
.post(rentelControllers.create)
.get(rentelControllers.getAll)

rentalRouter.route('/:id')
.get(rentelControllers.getById)
.put(rentelControllers.update)
.delete(rentelControllers.remove)

export default rentalRouter;
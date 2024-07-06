import { Router } from "express";
import * as specialControllers from "../car/car.controllers";


const specialRouter = Router();

specialRouter.get('/special1', specialControllers.carByModel)
specialRouter.get('/special2', specialControllers.avilableCars)
specialRouter.get('/special3', specialControllers.rentedOrSpecificCars)
specialRouter.get('/special4', specialControllers.rentedOrRentedCars)

export default specialRouter;
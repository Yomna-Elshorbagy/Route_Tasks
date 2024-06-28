import { Router } from "express";
import { addCar, availableOrRentedSpecificModel, availableOrRentedSpecificModel2, deleteCar, getAllCars, getAvailableCarsByModel, getCarById, getCarsByModels, rentedOrSpecificModel, updateCar } from "./car.controllers.js";


const carRouter = Router();

carRouter.route('/')
.get(getAllCars)
.post(addCar)

carRouter.route('/availableModel')
.get(getAvailableCarsByModel)

carRouter.route('/byModels')
.get(getCarsByModels)

carRouter.route('/rentedOrSpecificModel')
.get(rentedOrSpecificModel)

carRouter.route('/availableOrRentedSpecificModel')
.get(availableOrRentedSpecificModel)

carRouter.route('/availableOrRentedSpecificModel2')
.get(availableOrRentedSpecificModel2)

carRouter.route('/:carId')
.get(getCarById)
.put(updateCar)
.delete(deleteCar)



export default carRouter;
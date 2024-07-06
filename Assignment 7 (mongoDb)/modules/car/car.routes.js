import { Router } from "express";
import * as carControllers from "./car.controllers.js"

const carRouter = Router();

carRouter.post('/',carControllers.create)
carRouter.get('/', carControllers.getAll)
carRouter.route('/:id')
.put(carControllers.update)
.delete(carControllers.remove)
.get(carControllers.getById)



export default carRouter;
import { Router } from "express";
import { adddTrainer, deleteTrainer, getAllTrainers, getTrainerById, updateTrainer } from "./trainer.controllers.js";

const trainerRouter = Router();

trainerRouter.route('/')
.get(getAllTrainers)
.post(adddTrainer)

trainerRouter.route('/:id')
.get(getTrainerById)
.put(updateTrainer)
.delete(deleteTrainer);



export default trainerRouter;
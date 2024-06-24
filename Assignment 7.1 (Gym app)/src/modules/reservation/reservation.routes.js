import { Router } from "express";
import { addReservation, deleteReservation, getAllReservations, getRseerveById, updateReservation } from "./reservation.controllers.js";

const reserveRouter = Router();

reserveRouter.route('/')
.get(getAllReservations)
.post(addReservation)

reserveRouter.route('/:id')
.get(getRseerveById)
.put(updateReservation)
.delete(deleteReservation)



export default reserveRouter;
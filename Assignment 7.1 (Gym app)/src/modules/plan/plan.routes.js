import { Router } from "express";
import { addPlan, deletePlan, getAllPlans, getPlanById, updatePlan } from "./plan.controllers.js";

const planRouter = Router();

planRouter.route('/')
.get(getAllPlans)
.post(addPlan)

planRouter.route('/:id')
.get(getPlanById)
.put(updatePlan)
.delete(deletePlan)



export default planRouter;
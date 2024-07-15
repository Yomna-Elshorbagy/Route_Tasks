import { Router } from "express";
import * as massageControllers from './massage.controllers.js'
import { verifyToken } from "../../midelwares/verifyToken.js";
import { validate } from "../../midelwares/validate.js";
import { addVal, updateVal } from "./massage.validation.js";

const massageRouter = Router();

// massageRouter.use(verifyToken);

massageRouter.post('/',validate(addVal),massageControllers.addMassage);
massageRouter.get('/',verifyToken,massageControllers.getAllMassages);

massageRouter.route('/:id')
.get(massageControllers.getById)
.put(verifyToken,validate(updateVal),massageControllers.updateMassage)
.delete(verifyToken,massageControllers.deleteMassages);

export default massageRouter;
import { Router } from "express";
import * as noteControllers from './note.controllers.js'
import { verifyToken } from "../../midelwares/verifyToken.js";

const noteRouter = Router();

noteRouter.use(verifyToken);

noteRouter.post('/',noteControllers.addNote)
noteRouter.get('/',noteControllers.getAllNotes)
noteRouter.route('/:id')
.get(noteControllers.getById)
.put(noteControllers.updatenote)
.delete(noteControllers.deletenotes)

export default noteRouter;
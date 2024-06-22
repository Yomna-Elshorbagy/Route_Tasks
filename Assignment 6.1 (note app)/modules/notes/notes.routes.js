import express from "express";
import { addNote, deleteNote, getAllNotes, getNoteById, updateNote } from "./notes.controllers.js";

const notesRouter = express.Router();

notesRouter.get('/',getAllNotes)
notesRouter.get('/:id', getNoteById)
notesRouter.post('/addNote', addNote)
notesRouter.put('/:id', updateNote)
notesRouter.delete('/:id', deleteNote)

export default notesRouter;
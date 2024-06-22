import express from "express";
import { addNote, deleteNote, getAllNotes, getNoteById, updateNote } from "./notes.controllers.js";

const notesRouter = express.Router();

notesRouter.get('/',getAllNotes)
notesRouter.get('/', getNoteById)
notesRouter.post('/', addNote)
notesRouter.put('/', updateNote)
notesRouter.delete('/', deleteNote)

export default notesRouter;
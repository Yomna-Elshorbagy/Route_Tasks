import { Router } from "express";
import * as bookControllers from './books.controllers.js'

let bookRouter = Router();

bookRouter.route('/')
.post(bookControllers.addBook)
.get( bookControllers.getAllBooks)

bookRouter.route('/:id')
.get( bookControllers.getBookById)
.put(bookControllers.updateBook)
.delete(bookControllers.deleteBook)

export default bookRouter;
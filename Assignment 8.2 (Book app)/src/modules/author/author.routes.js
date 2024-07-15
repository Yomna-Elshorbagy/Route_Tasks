import { Router } from "express";
import * as authorControllers from './author.controllers.js'

let authorRouter = Router();

authorRouter.route('/')
.post(authorControllers.addAuthor)
.get( authorControllers.getAllAuthors)

authorRouter.route('/:id')
.get( authorControllers.getAuthorById)
.put(authorControllers.updateAuthor)
.delete(authorControllers.deleteAuthor)
 

authorRouter.get('/books/:id',authorControllers.getBooks)
export default authorRouter;
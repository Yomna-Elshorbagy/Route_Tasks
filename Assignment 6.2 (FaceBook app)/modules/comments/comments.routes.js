import express from 'express';
import { addComment, deleteComment, getAllComments, updatComments } from './comments.controlers.js';
import {  isUser } from '../../midllwares/isOwner.js';

const commentRouter = express.Router();

commentRouter.get('/', getAllComments);
commentRouter.post('/addComment',addComment );
commentRouter.put('/:id',isUser, updatComments );
commentRouter.delete('/:id',isUser,deleteComment );

export default commentRouter;
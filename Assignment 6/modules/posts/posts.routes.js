import express from 'express';
import { addPost, deletePost, getAllPosts, getPostWithAuthor, updatePost } from './posts.controlers.js';
import { isOwner } from '../../midllwares/isOwner.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/addPost', addPost);
postRouter.put('/:id',isOwner,updatePost );
postRouter.delete('/:id',isOwner, deletePost);
postRouter.get('/author/:id', getPostWithAuthor )



export default postRouter;
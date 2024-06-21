import express from "express";
import { addPost, deletePost, getAllPosts, getPostById, updatePost } from "./posts.controllers.js";

const postRouter = express.Router();

postRouter.get('/',getAllPosts)
postRouter.get('/', getPostById)
postRouter.post('/', addPost)
postRouter.put('/', updatePost)
postRouter.delete('/', deletePost)

export default postRouter;
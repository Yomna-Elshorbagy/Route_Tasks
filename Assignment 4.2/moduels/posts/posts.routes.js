import { Router } from "express";
import { addpost, deleteUser, getAllPosts, getUserPosts, getsinglePosts, updateUser } from "./posts.controlers.js";
const postsRouter = Router();

postsRouter.post('/addpost', addpost)
postsRouter.get('/posts', getAllPosts)
postsRouter.get('/post/:id', getsinglePosts)
postsRouter.get('/user/:id', getUserPosts)
postsRouter.put('/post/:id', updateUser)
postsRouter.delete('/post/:id', deleteUser)

export default postsRouter;
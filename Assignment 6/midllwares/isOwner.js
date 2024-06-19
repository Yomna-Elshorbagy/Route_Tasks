import commentsModel from "../database/models/comments.model.js";
import postsModel from "../database/models/posts.models.js"


export const isOwner =async (req,res,next)=>{
    const {id} = req.params;
    const post = await postsModel.findByPk(id)

    if(!post){
        return res.json({ message: 'post Not found'})
    };
    if(post.author != req.body.author){
        return res.json({ message: 'you donot have permission'})
    };

    next()
}
export const isUser =async (req,res,next)=>{
    const {id} = req.params;
    const comment = await commentsModel.findByPk(id);
    if(!comment){
        return res.json({ message: 'comment Not found'})
    }

    if(comment.userId != req.body.userId){
        return res.json({ message: 'you donot have permission'})
    }

    next()
}
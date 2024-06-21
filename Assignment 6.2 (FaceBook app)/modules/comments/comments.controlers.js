import commentsModel from "../../database/models/comments.model.js"
import postsModel from "../../database/models/posts.models.js";
import userModel from "../../database/models/users.model.js";


export const getAllComments =async (req,res,next)=>{
    const allcomments = await commentsModel.findAll();
    return res.json({message:'all comments: ', allcomments});
};

export const deleteComment =async (req,res,next)=>{
    const {id}= req.params;
    const comment = await commentsModel.destroy({
        where:{
            id
        }
    });
    return res.json({message:'comment deleted sucessfully', comment});
};

export const addComment =async (req,res,next)=>{
    const {content, userId, postId}= req.body;

    // const isComment = await commentsModel.findOne({
    //     where:{
    //         id,
    //     }
    // });
   
    const comment = await commentsModel.create({
        content,
        userId,
        postId
    });
    return res.json({message:'comment added sucessfully', comment});
};

export const updatComments =async (req,res,next)=>{
    const {id}= req.params;
    
    const {content, userId, postId}= req.body;
    const comment = await commentsModel.update({
        content,
        userId,
        postId
    },{
        where: {
            id : req.params.id
        }
    });

    return res.json({message:'comment updated sucessfully', comment});
}


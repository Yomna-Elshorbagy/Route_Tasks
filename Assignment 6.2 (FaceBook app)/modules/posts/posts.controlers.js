import postsModel from "../../database/models/posts.models.js"
import userModel from "../../database/models/users.model.js";


export const getAllPosts = async(req,res,next)=>{

    const allPosts = await postsModel.findAll();
    res.json({message:'All posts : ', allPosts})
};

export const addPost = async(req,res,next)=>{
    const {title,content, author} = req.body;
    const isPost = await postsModel.findOne({
        where:{
            title,
            content,
        }
    });

    if(isPost){
        return  res.json({message:'post already Exist ', isPost}) 
    }

    const post = await postsModel.create({
        title,
        content, 
        author
    })
    res.json({message:'post added successfully ', post})
};

export const updatePost = async(req,res,next)=>{
    const {title,content, author} = req.body;

    const postUpdated = await postsModel.update({
        title,
        content
    }, {
        where: {
            id : req.params.id
        }
    });
    res.json({message:'post Updated Sucessfully ', postUpdated})
};

export const deletePost = async(req,res,next)=>{
    const {id} = req.params;
    const postUpdated = await postsModel.destroy({
        where: {
            id :id
        }
    });
    res.json({message:'post deleted Sucessfully ', postUpdated})
};

export const getPostWithAuthor = async (req, res) => {
    const { id } = req.params;
      const post = await postsModel.findByPk(id, {
        attributes:['title', 'content', 'author'],
        include: {model: userModel}
    },);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if(post.author != req.body.author){
        return res.json({ message: 'you donot have permission'})
    };
      res.json({message:'post with author is: ',post});
  };

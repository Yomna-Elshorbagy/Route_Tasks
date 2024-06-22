import commentsModel from "../../database/models/comments.model.js";
import postsModel from "../../database/models/posts.models.js";
import userModel from "../../database/models/users.model.js";
import bcyrpt from 'bcryptjs'


export const signup = async (req,res,next)=>{
    const {
        username,
        email,
        password
    } = req.body;
    
   const isEmail = await userModel.findOne({
    where:{email}
   });

   if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
}
   if(isEmail){
    return res.json({ message : 'Email already exist'});
   };

   const hashedPass = bcyrpt.hashSync(password, 8);

   const user = await userModel.create({
    username,
    email,
    password:hashedPass
   });

   return res.status(201).json({message: 'User added sucessfully', user})
};


export const logIn = async (req,res,next)=>{
    const {email , password} = req.body;

    const isUser = await userModel.findOne({
        where: {
            email,
        }
    });

    const isPass = bcyrpt.compareSync(password ,isUser.password );

    if (!isUser || !isPass){
        return res.status(404).json({message: 'invalid Email Or Password'})
    }

    res.json({message: 'LOgin sucessfully', isUser})
};

export const getAllUsers = async(req, res, next)=>{
    const isUser = await userModel.findAll();
    res.json({message: 'allUsers are : ', isUser})
};

export const updateUser = async (req,res)=>{
    const {username, email, password} = req.body;
    const {id}= req.params;

    const isUser = await userModel.findOne({
        where:{id}
    });
    if(!isUser){
        return res.json({message:'user Not found'})
    };
    const [updatedUser] = await userModel.update({
        username,
        email,
        password
    }, {
        where:{
        id: req.params.id
    }
   });
   res.status(200).json({message:'user Updated Sucessfully',updatedUser})
 };

 export const deleteUser = async (req,res)=>{
    const {id}= req.params;
    const isUser = await userModel.findOne({
        where:{id,}
    });
    if(!isUser){
        return res.json({message:'user Not found'})
    };
    const deletedUser = await userModel.destroy({
        where: {
            id :id
        }
    });
    res.json({message:'user deleted Sucessfully',deletedUser})
 }


export const logout = (req, res) => {
    res.json({ message: 'Logout successful' });
  };

  
export const getUserPostAndComments = async (req, res) => {
    const { userId, postId } = req.params;
 
        const user = await userModel.findOne({
            where: { id: userId },
            include: {
                model: postsModel,
                where: { id: postId },
                include: [commentsModel]
            }
        });
      if (!user) {
        return res.status(404).json({ error: 'User or Post not found' });
      }
      res.status(200).json({ message: 'User, Post, and Comments retrieved successfully', user });
    }

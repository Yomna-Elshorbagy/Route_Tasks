import userModel from "../../database/models/user.model.js";
import bcyrpt from 'bcrypt'

export const signUp = async(req,res)=>{

    const {name, email, password} = req.body;
    const isEmail = await userModel.findOne({
        where: {email}
    });
    if(isEmail){
        res.json({message:'email already exisist '});
    }
    if(!email || !name || !password){
        res.json({message:'All fields ara required'});
    } 

    const hashedPass = bcyrpt.hashSync(password, 8);

    const user= await userModel.create({
        name, 
        email,
        password: hashedPass
    });
    return res.status(201).json({message: 'User added sucessfully', user});
};

export const logIn = async(req,res)=>{
    const { email, password} = req.body;

    const isUser = await userModel.findOne({
        where: {email}
    });
    const isPass = bcyrpt.compareSync(password, isUser.password);
    if(!isPass || !isUser){
       return res.status(404).json({message:'Invalid emal or password'});
    };

    res.status(200).json({message:'logIn Sucessfully..', isUser});
};

export const getAllUsers = async(req,res)=>{
    const allUsers = await userModel.findAll();
    res.json({message: 'All users: ', allUsers})
};

export const updateUser = async (req,res)=>{
    const {name, email, password} = req.body;
    const {id}= req.params;

    const isUser = await userModel.findOne({
        where:{id}
    });
    if(!isUser){
        return res.json({message:'user Not found'})
    };
    const [updatedUser] = await userModel.update({
        name,
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


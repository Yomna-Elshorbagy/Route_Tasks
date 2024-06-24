
import bcrypt from 'bcrypt';
import userModel from '../../../database/models/user.model.js';


export const getAllUsers = async (req,res,next)=>{
    try{
    let users = await userModel.find();
    res.status(200).json({ message: "All Users: ", users });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserById = async (req,res,next)=>{
    try{
        let {id}= req.params;
        let user = await userModel.findById(id);
        if(!user){
            return res.json({message:'user doesnot exisit'})
        }
        res.status(200).json({ message: "User: ", user });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const signUp = async (req,res, next)=>{
    try{
        let { userName, age, email, password, Cpassword } = req.body; 
        if (password != Cpassword){
            return res.json({message: "password annd confirmed password doesnot Match" });
        }
        let foundedUser = await userModel.findOne({email: req.body.email});
        if(foundedUser){
            return res.json({message: "User alredy register" });
        }
        let hashedPass = bcrypt.hashSync(password, 8);
        let user = await userModel.insertMany({
            userName,
            age,
            email,
            password: hashedPass,
        })
        res.status(201).json({message: "User added Sucessfully", user });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logIn = async (req,res, next)=>{
    try{
        let {email, password}= req.body;
        let foundedUser = await userModel.findOne({email});
        if(!foundedUser){
            return res.status(404).json({message: "User doesnot exisit please register first" });
        };
        let matchedPass = bcrypt.compareSync(password, foundedUser.password);
        if(!matchedPass){
            return res.status(400).json({message: "password and confirmed password doesnot match" });
        };
        res.json({ message: "Loged in sucessfully.." });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req,res, next)=>{
    let {id}= req.params;
    let { userName, age, email, password } = req.body; 

    let founddUser = await userModel.findById(id);
    if(!founddUser){
        return res.status(404).json({message: "User doesnot exisit" });
    };
    let updatedUser = await userModel.findByIdAndUpdate(
        founddUser._id,
        {
            userName,
            email,
            age,
            password
        },
        { new: true }
    )
    res.json({ message: "user updated sucessfully.." ,updatedUser});
};

export const deleteUser = async (req,res, next)=>{
   try{
    let {id}= req.params;
    let founddUser = await userModel.findById(id);
    if(!founddUser){
        return res.status(404).json({message: "User doesn't exisit" });
    };
    let deletedUser = await userModel.findByIdAndDelete(id);
    res.json({ message: "user deleted sucessfully.." ,deletedUser});
   }catch(err) {
    console.log("error is: " ,err);
    res.status(500).json({ error: "Internal Server Error" });
   }
};

export const resetPassword = async (req, res) => {
    try{
        let {email, password} = req.body;
        let founddUser = await userModel.findOne({email});
        if(!founddUser){
            return res.status(404).json({message: "email doesn't exisit" });
        };
        let hashedPass = bcrypt.hashSync(password, 8);
        let updatedUser = await userModel.findOneAndUpdate(
            { email: founddUser.email },
            { password:hashedPass,},
            { new: true }
        )
        res.status(200).json({ message: "Password reset successfully",updatedUser });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
       }
};
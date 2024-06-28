import userModel from "../../database/models/user.model.js";
import bcrypt from 'bcryptjs';


export const checkEmail = async (req,res,next)=>{
    let {email,password} = req.body;
    let foundedCustomer = await userModel.findOne({email}); 
    if(foundedCustomer){
        return res.status(404).json({message: "customer already exisit" });
    };
    req.body.password = bcrypt.hashSync(password, 8);

    next();
}
import userModel from "../../database/models/user.model.js";

export const isOwner = async (req,res,next)=>{
    let {id}= req.body;
    let user = await userModel.findById(id);
    
    if(!user){
        return res.json({ message: 'user Not found'})
    };

    if(user.role !== 'owner' && user.role !== 'manager'){
        return res.json({ message: 'you donot have permission'});
    }
    next();
}
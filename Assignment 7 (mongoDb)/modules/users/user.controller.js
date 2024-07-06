import { ObjectId } from "mongodb";
import { db } from "../../databases/dbConnection.js";

const userModel = db.collection('users');

//signup //login
export const adduser = async (req,res)=>{
    let user = await db.collection('users').insertOne(req.body);
    res.status(201).json({message: 'user added sucessfully',user })
};


//Update 
export const updatUser = async (req,res)=>{
    let updatedUser = await db.collection('users')
    .updateOne({_id: new ObjectId(req.params.id)},{$set : req.body});
    res.status(200).json({message: 'user updated sucessfully',updatedUser })
};
export const update = async(req ,res)=>{
    const {name, phone , userId} = req.body;
    const {id}= req.params;
 
    if (id != userId ) return res.json({message: 'you are Not the Owner'})
    let {matchedCount} = await userModel.updateOne({  // matchedCountis Number property return 0 or 1
 
      _id:new ObjectId(id)
     },{
        $set:{name,phone}
     });
    
    return !matchedCount
    ? res.json({message: 'user Not Found', status: false})
    : res.json({message: 'user updated sucessfully', status: true})
}

// delete user
export const deleteUser = async (req,res)=>{
    let deletedUser = await db.collection('users')
    .deleteOne({_id: new ObjectId(req.params.id)});
    res.status(200).json({message: 'user deleted sucessfully',deletedUser })
};
export const remove = async (req,res)=>{
    const {id}= req.params.id;
    const {userId}= req.body;

    if (id != userId) return res.json({message: "you donot have authontication"});

    const {deletedCount} = await userModel.deleteOne({_id: new ObjectId(id) });
    return !deletedCount
    ? res.json({message: 'user Not Found', status: false})
    : res.json({message: 'user deleted sucessfully', status: true})

}

//getAll 
export const getAllUsers = async (req,res)=>{
    let users = await db.collection('users').find().toArray()
    res.status(200).json({message: 'All users',users })
};
export const getAll = async(req ,res)=>{
    const users = await userModel.find().toArray();

    return users.length
    ? res.json({message:'users are: ', status: true, users})
    : res.json({message:'No users found'})
};


//Get By Id
export const getUserById = async (req,res)=>{
    let users = await db.collection('users').findOne({_id: new ObjectId(req.params.userId)})
    res.status(200).json({message: 'All users',users })
};
export const getById = async(req ,res)=>{
    const user = await userModel.findOne({_id: new ObjectId(req.params.id)}).toArray();

    return user
    ? res.json({message:'users are: ',status: true, user})
    : res.json({message:'No users found', status: false})
};
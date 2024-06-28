
import bcrypt from 'bcryptjs';
import userModel from '../../../database/models/user.model.js';


export const getAllCustomers = async (req,res,next)=>{
    try{
    let customers = await userModel.find();
    res.status(200).json({ message: "All customers: ", customers });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getCustomerById = async (req,res,next)=>{
    try{
        let {id}= req.params;
        let customer = await userModel.findById(id);
        if(!customer){
            return res.json({message:'customers doesnot exisit'})
        }
        res.status(200).json({ message: "customer: ", customer });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const signUp = async (req,res, next)=>{
    try{
        let { userName, phoneNo, email, password, Cpassword } = req.body; 
        if (password != Cpassword){
            return res.json({message: "password annd confirmed password doesnot Match" });
        }
        let foundedCustomer = await userModel.findOne({email: req.body.email});
        if(foundedCustomer){
            return res.json({message: "Customer alredy register" });
        }
        let hashedPass = bcrypt.hashSync(password, 8);
        let customer = await userModel.insertMany({
            userName,
            phoneNo,
            email,
            password:hashedPass
        });
        customer[0].password = undefined; //prevent password to send to front end
        res.status(201).json({message: "Customer added Sucessfully", customer });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// export const logIn = async (req,res, next)=>{
//     try{
//         let {email, password}= req.body;
//         let foundedCustomer = await userModel.findOne({email:email});

//         if(!foundedCustomer){
//             return res.status(404).json({message: "incorrect email or password" });
//         };
//         let matchedPass = bcrypt.compareSync(password, foundedCustomer.password);

//         if(!matchedPass){
//             return res.status(404).json({message: "incorrect email or password" });
//         };
//         res.json({ message: "Loged in sucessfully.." ,foundedCustomer });
//     }catch(err) {
//         console.log("error is: " ,err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


export const logIn = async (req,res, next)=>{
    try{
        let {email, password}= req.body;
        let foundedCustomer = await userModel.findOne({email:email}); // if null password will be null ==> err in password

        if(!foundedCustomer || !bcrypt.compareSync(password, foundedCustomer.password)){ // if null will go to else without comparing pass
            return res.status(404).json({message: "incorrect email or password" });
        };
        res.json({ message: "Loged in sucessfully.." ,foundedCustomer });

    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateCustomer = async (req,res, next)=>{
    let {id}= req.params;
    let { userName, phoneNo, email, isActive, status } = req.body; 

    let foundedCustomer = await userModel.findById(id);
    if(!foundedCustomer){
        return res.status(404).json({message: "customer doesnot exisit" });
    };
    let updatedcustomer = await userModel.findByIdAndUpdate(
        foundedCustomer._id,
        {
            userName,
            email,
            phoneNo,
            isActive, 
            status
        },
        { new: true }
    )
    res.json({ message: "customer updated sucessfully.." ,updatedcustomer});
};
export const resetPassword = async (req, res) => {
    try{
        let {email, password} = req.body;
        let foundedCustomer = await userModel.findOne({email});
        if(!foundedCustomer){
            return res.status(404).json({message: "email doesn't exisit" });
        };
        let hashedPass = bcrypt.hashSync(password, 8);
        let updatedCustomer = await userModel.findOneAndUpdate(
            { email: foundedCustomer.email },
            { password:hashedPass,},
            { new: true }
        )
        res.status(200).json({ message: "Password reset successfully",updatedCustomer });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
       }
};
export const deleteCustomer = async (req,res, next)=>{
   try{
    let {id}= req.params;
    let founddCustomer = await userModel.findById(id);
    if(!founddCustomer){
        return res.status(404).json({message: "Customer doesn't exisit" });
    };
    let deletedCustomer = await userModel.findByIdAndDelete(id);
    res.json({ message: "customer deleted sucessfully.." ,deletedCustomer});
   }catch(err) {
    console.log("error is: " ,err);
    res.status(500).json({ error: "Internal Server Error" });
   }
};
import planModel from "../../../database/models/plan.model.js";


export const getAllPlans = async (req,res,next)=>{
    try{
    let plans = await planModel.find();
    res.status(200).json({ message: "All plans: ", plans });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPlanById = async (req,res,next)=>{
    try{
        let {id}= req.params;
        let plan = await planModel.findById(id);
        if(!plan){
            return res.json({message:'plan doesnot exisit'})
        }
        res.status(200).json({ message: "plan: ", plan });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addPlan = async (req,res, next)=>{
    try{
        let { title, description, fee, features } = req.body; 
    
        let foundedPlan = await planModel.findOne({title: title});
        if(foundedPlan){
            return res.json({message: "plan alredy exisist" });
        }
        let plan = await planModel.insertMany({
            title,
            description,
            fee,
            features,
        })
        res.status(201).json({message: "plan added Sucessfully", plan });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updatePlan = async (req,res, next)=>{
    let {id}= req.params;
    let { title, description, fee, features } = req.body; 

    let foundedPlan = await planModel.findById(id);
    if(!foundedPlan){
        return res.status(404).json({message: "Plan doesnot exisit" });
    };
    let updatedUser = await planModel.findByIdAndUpdate(
        foundedPlan._id,
        {
            title,
            description,
            fee,
            features
        },
        { new: true }
    )
    res.json({ message: "Plan updated sucessfully.." ,updatedUser});
};

export const deletePlan = async (req,res, next)=>{
    try{
     let {id}= req.params;
     let foundedPlan = await planModel.findById(id);
     if(!foundedPlan){
         return res.status(404).json({message: "Plan doesn't exisit" });
     };
     let deletedPlan = await planModel.findByIdAndDelete(id);
     res.json({ message: "Plan deleted sucessfully.." ,deletedPlan});
    }catch(err) {
     console.log("error is: " ,err);
     res.status(500).json({ error: "Internal Server Error" });
    }
 };
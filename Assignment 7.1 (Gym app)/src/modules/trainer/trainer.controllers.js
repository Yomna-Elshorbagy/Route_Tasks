import trainerModel from "../../../database/models/trainer.model.js";


export const getAllTrainers = async (req,res,next)=>{
    try{
    let trainers = await trainerModel.find();
    res.status(200).json({ message: "All trainers: ", trainers });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getTrainerById = async (req,res,next)=>{
    try{
        let {id}= req.params;
        let trainer = await trainerModel.findById(id);
        if(!trainer){
            return res.json({message:'trainer doesnot exisit'})
        }
        res.status(200).json({ message: "trainer: ", trainer });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteTrainer = async (req,res, next)=>{
    try{
     let {id}= req.params;
     let foundedTrainer = await trainerModel.findById(id);
     if(!foundedTrainer){
         return res.status(404).json({message: "trainer doesn't exisit" });
     };
     let deletedtrainer = await trainerModel.findByIdAndDelete(id);
     res.json({ message: "trainer deleted sucessfully.." ,deletedtrainer});
    }catch(err) {
     console.log("error is: " ,err);
     res.status(500).json({ error: "Internal Server Error" });
    }
 };

 export const adddTrainer = async (req,res, next)=>{
    try{
        let { name, salary, email, password, Cpassword,start_time, end_time } = req.body; 
        if (password != Cpassword){
            return res.json({message: "password annd confirmed password doesnot Match" });
        }
        let foundedTrainer = await trainerModel.findOne({email: req.body.email});
        if(foundedTrainer){
            return res.json({message: "Trainer alredy exisit" });
        }
        let hashedPass = bcrypt.hashSync(password, 8);
        let trainer = await trainerModel.insertMany({
            name,
            salary,
            email,
            password: hashedPass,
            start_time,
            end_time
        })
        res.status(201).json({message: "trainer added Sucessfully", trainer });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateTrainer = async (req,res, next)=>{
    let {id}= req.params;
    let { name, salary, email, password, Cpassword,start_time, end_time } = req.body; 

    let foundedTrainer = await trainerModel.findById(id);
    if(!foundedTrainer){
        return res.status(404).json({message: "Trainer doesnot exisit" });
    };
    let hashedPass = bcrypt.hashSync(password, 8);
    let updatedTraiber = await trainerModel.findByIdAndUpdate(
        foundedTrainer._id,
        {
            name,
            salary,
            email,
            password: hashedPass,
            start_time,
            end_time
        },
        { new: true }
    )
    res.json({ message: "Trainer updated sucessfully.." ,updatedTraiber});
};
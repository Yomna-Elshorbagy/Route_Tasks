import planModel from "../../../database/models/plan.model.js";
import reservationModel from "../../../database/models/reservation.model.js";
import userModel from "../../../database/models/user.model.js";


export const getAllReservations = async (req,res,next)=>{
    try{
    let reservation = await reservationModel.find()
    .populate('client')
    .populate('plan'); 
    res.status(200).json({ message: "All reservations: ", reservation });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getRseerveById = async (req,res,next)=>{
    try{
        let {id}= req.params;
        let reservation = await reservationModel.findById(id)  
        .populate('client')
        .populate('plan');
        if(!reservation){
            return res.json({message:'reservation doesnot exisit'})
        }
        res.status(200).json({ message: "reservation: ", reservation });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addReservation = async (req,res, next)=>{
    try{
        let { client, plan, start_time, end_time } = req.body; 
    
        const user = await userModel.findById(client);
        if (!user) {
            return res.status(404).send({ message: "user Doesn't exisit.." });
          }
        const foundedPlan = await planModel.findById(plan);
        if (!foundedPlan) {
            return res.status(404).send({ message: "plan Doesn't exisit.." });
          }
        let Reserve = await reservationModel.insertMany({
            client,
            plan,
            start_time,
            end_time,
        })
        res.status(201).json({message: "Reservation added Sucessfully", Reserve });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateReservation = async (req,res, next)=>{
    let {id}= req.params;
    let { client, plan, start_time, end_time } = req.body; 

    let foundedReservation = await reservationModel.findById(id);
    if(!foundedReservation){
        return res.status(404).json({message: "Reservation doesnot exisit" });
    };
    let updatedReservation = await reservationModel.findByIdAndUpdate(
        foundedReservation._id,
        {
            client,
            plan,
            start_time,
            end_time,
        },
        { new: true }
    )
    res.json({ message: "Reservation updated sucessfully.." ,updatedReservation});
};

export const deleteReservation = async (req,res, next)=>{
    try{
     let {id}= req.params;
     let foundedReservation = await planModel.findById(id);
     if(!foundedReservation){
         return res.status(404).json({message: "Reservation doesn't exisit" });
     };
     let deletedReservation= await planModel.findByIdAndDelete(id);
     res.json({ message: "Reservation deleted sucessfully.." ,deletedReservation});
    }catch(err) {
     console.log("error is: " ,err);
     res.status(500).json({ error: "Internal Server Error" });
    }
 };
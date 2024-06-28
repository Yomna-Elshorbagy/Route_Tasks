import carModel from "../../../database/models/car.model.js";
import rentalModel from "../../../database/models/rental.model.js";


export const getAllrentals = async (req,res,next)=>{
    try{
    let rentals = await rentalModel.find();
    res.status(200).json({ message: "All rentals: ", rentals });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getrentalById = async (req,res,next)=>{
    try{
        let {id}= req.params;
        let rental = await rentalModel.findById(id);
        if(!rental){
            return res.json({message:'rental data doesnot exisit'})
        }
        res.status(200).json({ message: "rental: ", rental });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createRental = async(req,res)=>{
    try{
        let {car, customer, rentalDate, return_date} = req.body;

        const foundCar = await carModel.findById(car);
        if(!foundCar){
            return res.json({message:"car doesn't exisit "})
        };
        if(foundCar.rentalStatus =='rented'){
        return res.json({message:"car rented and doesn't available Now  "})
    };
        let newRent = await rentalModel.insertMany({
            car,
            customer,
            rentalDate,
            return_date
        });
        
        let updatCrStatus = await carModel.findByIdAndUpdate(
        foundCar._id,
        {
            rentalStatus:'rented' 
        },
        { new: true }
     )
     res.status(201).json({message: "Rental added Sucessfully", newRent });


    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateRental = async(req, res)=>{
    try{
        let {rentalDate, return_date} = req.body;
        let{rentalId} = req.params;
        const foundRent = await rentalModel.findById(rentalId);
        if(!foundRent){
            return res.json({message:"Rental Data Doesn't exisist"})
        };
        const updatedRent = await rentalModel.findByIdAndUpdate(
            foundRent._id,
            {
                rentalDate,
                return_date
            },
            {new: true}
        );
        res.json({message:"Rental Updated Sucessfully",updatedRent })

    } catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const DeleteRental = async(req, res)=>{
    try{
        let{rentalId} = req.params;
        const foundRent = await rentalModel.findById(rentalId);
        if(!foundRent){
            return res.json({message:"Rental Data Doesn't exisist"})
        };
        const deleteRent = await rentalModel.findByIdAndDelete(
            foundRent._id,
            {new: true}
        );
        let updatCrStatus = await carModel.findByIdAndUpdate(
            foundCar._id,
            {
                rentalStatus:'available' 
            },
            { new: true }
         )
        res.json({message:"Rental deleted Sucessfully",deleteRent });


    } catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
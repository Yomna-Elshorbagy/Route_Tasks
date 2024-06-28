import carModel from "../../../database/models/car.model.js";


export const getAllCars = async (req,res,next)=>{
    try{
    let cars = await carModel.find();
    res.status(200).json({ message: "All cars: ", cars });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getCarById = async (req,res,next)=>{
    try{
        let {carId}= req.params;
        let car = await carModel.findById(carId);
        if(!car){
            return res.json({message:'car doesnot exisit'})
        }
        res.status(200).json({ message: "car: ", car });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addCar = async (req,res, next)=>{
    try{
        let { name, model } = req.body; 
    
        let foundedCar = await carModel.findOne({name: name});
        if(foundedCar){
            return res.json({message: "car alredy exisist" });
        }
        let car = await carModel.insertMany({
            name,
            model,
        })
        res.status(201).json({message: "car added Sucessfully", car });
    }catch(err) {
        console.log("error is: " ,err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateCar = async (req,res, next)=>{
    let {carId}= req.params;
    let { name, model } = req.body; 

    let foundedCar = await carModel.findById(carId);
    if(!foundedCar){
        return res.status(404).json({message: "Car doesnot exisit" });
    };
    let updatedCar = await carModel.findByIdAndUpdate(
        foundedCar._id,
        {
            name,
            model,
        },
        { new: true }
    )
    res.json({ message: "Car updated sucessfully.." ,updatedCar});
};

export const deleteCar = async (req,res, next)=>{
    try{
     let {carId}= req.params;
     let foundedCar = await carModel.findById(carId);
     if(!foundedCar){
         return res.status(404).json({message: "Car doesn't exisit" });
     };
     let deletedCar = await carModel.findByIdAndDelete(carId);
     res.json({ message: "Car deleted sucessfully.." ,deletedCar});
    }catch(err) {
     console.log("error is: " ,err);
     res.status(500).json({ error: "Internal Server Error" });
    }
 };

//Get all cars whose model is ‘Honda’ and ‘Toyota’ (using query params):
export const getCarsByModels = async (req, res, next) => {
    try {
        const { models } = req.query;
        const modelArr = models.split(','); 
        const cars = await carModel.find({ model: { $in: modelArr } });
        res.status(200).json({ message: "Cars by models:", cars });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//Get Available Cars of a Specific Model:
export const getAvailableCarsByModel = async (req, res, next) => {
    try {
        // const { model } = req.body;
        const { model } = req.query;
        const cars = await carModel.find({ model, rentalStatus: 'available' });
        res.status(200).json({ message: "Available cars of specified model:", cars });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//Get Cars that are Either rented or of a Specific Model.
export const rentedOrSpecificModel = async (req, res, next) => {
    try {
        // let { model } = req.body;   //using body
        const { model } = req.query;   //using query params
        const cars = await carModel.find({
            $or: [
                { rentalStatus: 'rented' },
                { model }
            ]
        });
        res.status(200).json({ message: "Cars rented or specified model:", cars });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//Get Available Cars of Specific Models or Rented Cars of a Specific Model
//using body
export const availableOrRentedSpecificModel2 = async (req, res, next) => {
    try {
        let { modelArr, rentedModel } = req.body; 
        let cars = await carModel.find({
            $or: [
                { model: { $in: modelArr }, rentalStatus: 'available' },
                { model: rentedModel, rentalStatus: 'rented' }
            ]
        });
        res.status(200).json({ message: "Available or rented  cars of a specific model: ", cars });
    } catch (err) {
        console.log("error is: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//using query params
export const availableOrRentedSpecificModel = async (req, res, next) => {
    try {
        const { models, rentedModel } = req.query;
        const modelArr = models.split(','); 
        const cars = await carModel.find({
            $or: [
                { model: { $in: modelArr }, rentalStatus: 'available' },
                { model: rentedModel, rentalStatus: 'rented' }
            ]
        });
        res.status(200).json({ message: "Available or rented  cars of a specific model:", cars });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



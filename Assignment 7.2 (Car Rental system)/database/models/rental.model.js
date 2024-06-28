import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    car: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Car",
        required: true 
    },
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Customer",
        required: true 
    },
    rentalDate: { 
        type: Date,
        required: true 
    },
    return_date: { 
        type: Date,
        required: true 
    },
}, {
    timestamps: true,
    versionKey:false
});

const rentalModel = mongoose.model('Rental', rentalSchema);

export default rentalModel;

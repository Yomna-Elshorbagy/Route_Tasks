import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    plan: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Plan",
        required: true 
    },
    start_time: { 
        type: Date,
        required: true 
    },
    end_time: { 
        type: Date,
        required: true 
    },
}, {
    timestamps: true
});

const reservationModel = mongoose.model('Reservation', reservationSchema);

export default reservationModel;

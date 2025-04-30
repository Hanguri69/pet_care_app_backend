const mongoose  = require("mongoose");

const AvailableTimeSchema = new mongoose.Schema(
    {
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
            index: true,
        },
    
        timeStart: {
            type: Date,
            required: true,
        },
        timeEnd: {
            type: Date,
            required: true,
        },
    }
);
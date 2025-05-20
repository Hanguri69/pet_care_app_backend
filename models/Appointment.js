const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: false,
      index: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
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
    reason: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: [ "Booked", "Completed", "New"],
      default: "New",
    },
    PaymentAddress: {
      type: String,
      default: "Pending",
      enum: [ "Pending", "Paid", "Cancelled"],
    },
    
    
  },
  
);


module.exports = mongoose.model("Appointment", AppointmentSchema);

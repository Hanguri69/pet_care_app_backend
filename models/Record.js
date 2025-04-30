const mongoose = require("mongoose")

const RecordSchema = new mongoose.Schema(
  {
    userId: { type:mongoose.Mongoose.Types.ObjectId, ref: "User", required: true },
    petId: { type: mongoose.Mongoose.Types.ObjectId, ref: "Pet", required: true },
    DoctorId: { type: mongoose.Mongoose.Types.ObjectId, ref: "Doctor", required: false },
    HospitalId: { type: mongoose.Mongoose.Types.ObjectId, ref: "Hospital", required: false },
    date: { type: Date, required: true },
    TreatmentId: { type: mongoose.Mongoose.Types.ObjectId, ref: "Treatment", required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);
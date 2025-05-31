// models/Record.js
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const RecordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    petId: {
      type: Schema.Types.ObjectId, 
      ref: "Pet",
      required: true,
    },
    DoctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    HospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    date: {
      type: Date,
      default: Date.now, 
      required: true,
    },
    endDate: {
      type: Date,
      default: Date.now, 
      required: true,
    },
    TreatmentId: {
      type: Schema.Types.ObjectId, 
      ref: "Treatment",
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", RecordSchema);

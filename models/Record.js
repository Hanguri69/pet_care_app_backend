// models/Record.js
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const RecordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // ← энд
      ref: "User",
      required: true,
    },
    petId: {
      type: Schema.Types.ObjectId, // ← болон энд
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
      default: Date.now, // default-оор Date.now өгч болно
      required: true,
    },
    TreatmentId: {
      type: Schema.Types.ObjectId, // ← болон энд
      ref: "Treatment",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", RecordSchema);

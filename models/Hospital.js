const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", HospitalSchema);

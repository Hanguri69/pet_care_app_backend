const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    phone: { type: String, required: false },
    email: { type: String, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", HospitalSchema);

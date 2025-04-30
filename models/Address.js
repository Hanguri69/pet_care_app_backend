const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

module.exports = mongoose.model("Address", AddressSchema);

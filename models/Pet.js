const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  deviceId: { type: String, required: false },
  breed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Breed",
    required: true,
  },
  age: { type: Number, required: false },
  gender: { type: String, required: false, enum: ["Male", "Female"] },
  photos: [{ type: String, required: false }],
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  geofenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Geofence",
    required: false,
  },
});

module.exports = mongoose.model("Pet", PetSchema);

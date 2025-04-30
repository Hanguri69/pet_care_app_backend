const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  breed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Breed",
    required: true,
  },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  photos: [{ type: String, required: true }],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false,
    },
  },
  geofenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Geofence",
    required: false,
  },
});
PetSchema.index({ location: "2dsphere" });


module.exports = mongoose.model("Pet", PetSchema);

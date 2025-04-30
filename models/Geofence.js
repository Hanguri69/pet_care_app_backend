const mongoose = require("mongoose");

const GeofenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
});

module.exports = mongoose.model("Geofence", GeofenceSchema);
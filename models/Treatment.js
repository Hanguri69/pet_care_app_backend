const mongoose = require("mongoose");
const Animal = require("./Animal");

const TreatmentSchema = new mongoose.Schema({
    AnimalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
    name: { type: String, required: true },
    expiryDate: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model("Treatment", TreatmentSchema);
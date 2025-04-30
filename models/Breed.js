const mongoose = require("mongoose");

const BreedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
    required: true,
  },
});

module.exports = mongoose.model("Breed", BreedSchema);

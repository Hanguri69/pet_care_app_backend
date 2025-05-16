const Breed = require("../models/Breed");

module.exports = {
  createBreed: async (req, res) => {
    const newBreed = new Breed(req.body);
    try {
      await newBreed.save();
      res
        .status(201)
        .json({ status: true, message: "Breed created successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getAllBreeds: async (req, res) => {
    try {
      const filter = {};
      if (req.query.animalId) {
        filter.animalId = req.query.animalId;
      }
      const breeds = await Breed.find(filter).select("-__v");
      res.status(200).json({ status: true, data: breeds });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};

//5077386250

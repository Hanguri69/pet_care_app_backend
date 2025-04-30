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
      const breeds = await Breed.find({ title: { $ne: "More" } }, { __v: 0 });

      res.status(200).json(breeds);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};

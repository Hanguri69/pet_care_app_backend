const Animal = require("../models/Animal");

module.exports = {
  createAnimal: async (req, res) => {
    const newAnimal = new Animal(req.body);
    try {
      await newAnimal.save();
      res
        .status(201)
        .json({ status: true, message: "Animal created successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  getAllAnimals: async (req, res) => {
    console.log("data fetched");
    try {
      const filter = {};
      if (req.query.animalId) {
        filter.animalId = req.query.animalId;
      }
      const animals = await Animal.find(filter).select("-__v");
      res.status(200).json({ status: true, data: animals });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteAnimal: async (req, res) => {
    try {
      // Attempt to delete and get back the deleted document
      const animal = await Animal.findByIdAndDelete(req.params.id);

      // Now check if anything was actually deleted
      if (!animal) {
        return res
          .status(404)
          .json({ status: false, message: "Animal not found" });
      }

      // If we got here, deletion succeeded
      res
        .status(200)
        .json({ status: true, message: "Animal deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};

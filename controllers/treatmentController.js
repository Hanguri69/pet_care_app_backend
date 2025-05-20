const Treatment = require("../models/Treatment");
const Pet = require("../models/Pet");
const Animal = require("../models/Animal");

module.exports = {
  // getTreatmentsForPet: async (req, res) => {
  //   try {
  //     const AnimalId = req.params.AnimalId;

  //     const pet = await Animal.findById(AnimalId)
  //       .populate({
  //         path: "breed",
  //         populate: { path: "animalId", select: "_id name" }
  //       });

  //     const animalId = pet.breed.animalId._id;
  //     // Find all treatments for that animal type
  //     const treatments = await Treatment.find({ AnimalId: animalId });

  //     return res.json({ status: true, data: treatments });
  //   } catch (error) {
  //     return res.status(500).json({ status: false, message: error.message });
  //   }
  // },
  // хэрэглэгч амьтны эмчилгээгээ харах treatment-үүд /
  getTreatmentsForAnimal: async (req, res) => {
    try {
      const AnimalId = req.params.AnimalId;
      const animalId = await Animal.findById(AnimalId);
      const treatments = await Treatment.find({ AnimalId: animalId._id });
      return res.json({ status: true, data: treatments });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  createTreatment: async (req, res) => {
    try {
      const { AnimalId, name, expiryDate, description } = req.body;
      if (!AnimalId || !name || !expiryDate || !description) {
        return res
          .status(422)
          .json({ status: false, message: "Missing required fields" });
      }
      const treatment = await Treatment.create({
        AnimalId,
        name,
        expiryDate,
        description,
      });
      return res.status(201).json({ status: true, data: treatment });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

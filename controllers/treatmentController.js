const Treatment = require("../models/Treatment");
const Pet = require("../models/Pet");

module.exports = {
 

  /**
   * Get treatments applicable to a specific pet by its species
   * GET /api/pets/:petId/treatments
   */
  getTreatmentsForPet: async (req, res) => {
    try {
      const petId = req.params.petId;
   
      const pet = await Pet.findById(petId)
        .populate({
          path: "breed",
          populate: { path: "animalId", select: "_id name" }
        });

      if (!pet) {
        return res.status(404).json({ status: false, message: "Pet not found" });
      }

      const animalId = pet.breed.animalId._id;
      // Find all treatments for that animal type
      const treatments = await Treatment.find({ AnimalId: animalId });

      return res.json({ status: true, data: treatments });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  /**
   * (Optional) Create a new treatment template (admin only)
   * POST /api/treatments
   */
  createTreatment: async (req, res) => {
    try {
      const { AnimalId, name, expiryDate, description } = req.body;
      if (!AnimalId || !name || !expiryDate || !description) {
        return res.status(422).json({ status: false, message: "Missing required fields" });
      }

      const treatment = await Treatment.create({ AnimalId, name, expiryDate, description });
      return res.status(201).json({ status: true, data: treatment });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }
};
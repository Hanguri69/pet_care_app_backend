const mongoose = require("mongoose");

const Record = require("../models/Record");
const Treatment = require("../models/Treatment");
const Pet = require("../models/Pet");

module.exports = {
  createRecord: async (req, res) => {
    try {
      console.log(" createRecord body:", req.body);

      const userId = req.user.id;
      const { petId, treatmentName } = req.body;
      const date = Date.now();

      if (!userId || !petId || !treatmentName) {
        return res
          .status(422)
          .json({ status: false, message: "Missing required fields" });
      }

      const pet = await Pet.findById(petId);
      if (!pet) {
        return res
          .status(404)
          .json({ status: false, message: "Pet not found" });
      }

      const treatment = await Treatment.findOne({ name: treatmentName });
      if (!treatment) {
        return res
          .status(404)
          .json({ status: false, message: "Treatment not found" });
      }

      const record = await Record.create({
        userId,
        petId,
        date,
        TreatmentId: treatment._id,
        endDate: date + treatment.expiryDate * 24 * 60 * 60 * 1000,
        isApproved: false,
      });

      return res.status(201).json({ status: true, data: record });
    } catch (error) {
      console.error("createRecord error:", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  },

  countRecordByPetId: async (req, res) => {
    try {
      const petId = req.params.petId;
      const count = await Record.countDocuments({ petId });
      return res.json({ status: true, data: count });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getRecordsByPetId: async (req, res) => {
    try {
      const petId = req.params.petId;
      const records = await Record.find({ petId });
      return res.json({ status: true, data: records });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

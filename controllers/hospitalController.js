const Hospital = require("../models/Hospital");
const Address = require("../models/Address");

module.exports = {
  createHospital: async (req, res) => {
    try {
      const { name, latitude, longitude, photo, description } = req.body;
      if (!name || !latitude || !longitude || !photo) {
        return res
          .status(422)
          .json({ status: false, message: "Missing fields" });
      }

      const hospital = await Hospital.create({
        name,
        latitude,
        longitude,
        photo,
        description,
      });

      return res
        .status(201)
        .json({ status: true, message: "Hospital created", hospital });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
  getAllHospitals: async (req, res) => {
    try { 
      const hospitals = await Hospital.find();
      return res.status(200).json({ status: true, data: hospitals });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
};

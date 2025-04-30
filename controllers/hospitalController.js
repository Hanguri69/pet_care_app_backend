const Hospital = require("../models/Hospital");
const Address = require("../models/Address");

module.exports = {
  createHospital: async (req, res) => {
    try {
      const { name, addressId } = req.body;
      if (!name || !addressId) {
        return res
          .status(422)
          .json({ status: false, message: "Missing fields" });
      }
      const hospital = await Hospital.create({
        name,
        addressId,
      });
      return res
        .status(201)
        .json({ status: true, message: "Hospital created", hospital });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
};

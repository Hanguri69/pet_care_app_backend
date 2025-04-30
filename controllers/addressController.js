const Address = require("../models/Address");

module.exports = {
  addAddress: async (req, res) => {
    const newAddress = new Address({
      addressLine1: req.body.addressLine1,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      city: req.body.city,
      district: req.body.district,
      
    });
    try {
      if (req.body.default === true) {
        await Address.updateMany({ userId: req.user.id }, { default: false });
      }
      await newAddress.save();
      res
        .status(201)
        .json({ status: true, message: "Address has been successfully added" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};

const Doctor = require("../models/Doctor");
const User = require("../models/User");

module.exports = {
  getDoctorByHospitalId: async (req, res) => {
    try {
      const { hospitalId } = req.params;
      // 1) Doctor–аас эмчийн жагсаалтыг авна, 2) userId талбарыг User-аар “оролцуулна”
      const doctors = await Doctor.find({ hospitalId }).populate({
        path: "userId", // Doctor схемд зааж өгсөн ref field
        model: "User", // User модель
        select: "username email profile", // Хүссэн талбаруудыг л шүүж авна
      });
      return res.status(200).json({ status: true, data: doctors });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

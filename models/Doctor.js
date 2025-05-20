const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
 
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  hospitalId: {type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true},
  imageUrl: { type: String, required: true },
  
  doctorExperience: { type: String, required: true },
  doctorEducation: { type: String, required: true },


 
});

module.exports = mongoose.model("Doctor", DoctorSchema);
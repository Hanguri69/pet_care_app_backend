const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: false, default: "none" },
    password: { type: String, required: true },
    verification: { type: Boolean, default: false },
    phone: { type: String, default: "99999999" },
    phoneVerification: { type: Boolean, default: false },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: false,
    },
    userType: {
      type: String,
      required: true,
      default: "Owner",
      enum: ["Owner", "Vet"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
   
    

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

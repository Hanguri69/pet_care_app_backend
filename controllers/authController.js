const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/otp_generator");
const sendMail = require("../utils/smtp_function");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (req, res) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ status: false, message: "Invalid email" });
    }

    const minPasswordLength = 8;

    if (req.body.password < minPasswordLength) {
      return res.status(400).json({
        status: false,
        message:
          "Password should be at least " +
          minPasswordLength +
          " characters long",
      });
    }

    try {
      const emailExists = await User.findOne({ email: req.body.email });

      if (emailExists) {
        return res
          .status(400)
          .json({ status: false, message: "Email already exists" });
      }

      // GENERATE OTP
      const otp = generateOtp();

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        userType: "Owner",
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET
        ).toString(),
        otp: otp,
      });

      // SAVE USER
      await newUser.save();

      // SEND OTP TO EMAIL
      sendMail(newUser.email, otp);

      res
        .status(201)
        .json({ status: true, message: "User successfully created." });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  createDoctor: async (req, res) => {
    try {
      const { username, email, password, hospitalId, experience, education } =
        req.body;
      // 1) Салбар валидаци
      if (!username || !email || !password || !hospitalId) {
        return res
          .status(422)
          .json({ status: false, message: "Missing fields" });
      }
      // 2) Email давхардалтыг шалгах
      if (await User.exists({ email })) {
        return res
          .status(409)
          .json({ status: false, message: "Email exists1" });
      }
      // 3) Парол хэшлэх
      const hash = await bcrypt.hash(password, 12);
      // 4) User үүсгэх
      const user = await User.create({
        username,
        email,
        password: hash,
        userType: "Vet",
        verification: true,
      });
      // 5) Doctor профайл үүсгэх
      await Doctor.create({
        userId: user._id,
        hospitalId,
        AvailableSlots: [],
        doctorExperience: experience,
        doctorEducation: education,
      });
      return res
        .status(201)
        .json({ status: true, message: "Doctor created", doctor: user._id });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  loginUser: async (req, res) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(req.body.email)) {
      return res
        .status(400)
        .json({ status: false, message: "Email is not valid" });
    }

    const minPasswordLength = 8;

    if (req.body.password < minPasswordLength) {
      return res.status(400).json({
        status: false,
        message:
          "Password should be at least " +
          minPasswordLength +
          " characters long",
      });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const depassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

      if (depassword !== req.body.password) {
        return res
          .status(400)
          .json({ status: false, message: "Wrong Password" });
      }

      const userToken = jwt.sign(
        {
          id: user._id,
          userType: user.userType,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "21d" }
      );

      const { password, createdAt, updatedAt, __v, otp, ...others } = user._doc;

      res.status(200).json({ ...others, userToken });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  loginDoctor: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(422)
          .json({ status: false, message: "Email and password required" });
      }
      const user = await User.findOne({ email });
      if (!user || user.userType !== "Vet") {
        return res
          .status(404)
          .json({ status: false, message: "Doctor not found" });
      }
      // 3) Парол харьцуулах
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ status: false, message: "Wrong password" });
      }
      // 4) Токен үүсгэх
      const token = jwt.sign(
        { id: user._id, userType: user.userType, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({
        status: true,
        data: { id: user._id, username: user.username, email: user.email },
        token,
      });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
  // loginDoctor: async (req, res) => {
  //   const { email, password } = req.body;
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   const minPasswordLength = 8;

  //   if (!emailRegex.test(email)) {
  //     return res.status(400).json({ status: false, message: "Invalid email" });
  //   }
  //   if (!password || password.length < minPasswordLength) {
  //     return res.status(400).json({
  //       status: false,
  //       message: `Password should be at least ${minPasswordLength} characters long`,
  //     });
  //   }

  //   try {
  //     const user = await User.findOne({ email, userType: "Vet" });
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ status: false, message: "Doctor not found" });
  //     }

  //     const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
  //     const originalPwd = bytes.toString(CryptoJS.enc.Utf8);
  //     if (originalPwd !== password) {
  //       return res
  //         .status(401)
  //         .json({ status: false, message: "Wrong password" });
  //     }

  //     const token = jwt.sign(
  //       {
  //         id: user._id,
  //         userType: user.userType,
  //         email: user.email,
  //       },
  //       process.env.JWT_SECRET,
  //       { expiresIn: "21d" }
  //     );

  //     const {
  //       password: pw,
  //       __v,
  //       otp,
  //       createdAt,
  //       updatedAt,
  //       ...doctorData
  //     } = user._doc;
  //     return res.status(200).json({ status: true, data: doctorData, token });
  //   } catch (err) {
  //     return res.status(500).json({ status: false, message: err.message });
  //   }
  // },
};

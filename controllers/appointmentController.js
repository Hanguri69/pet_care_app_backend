const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const User = require("../models/User");
const Pet = require("../models/Pet");
const { getAllAnimals } = require("./animalsController");

module.exports = {
  createAppointmentFromDoctor: async (req, res) => {
    const userId = req.user.id;
    const { timeList } = req.body;
    try {
      const doctor = await Doctor.findOne({ userId });
      if (!doctor) {
        return res
          .status(404)
          .json({ status: false, message: "Doctor not found" });
      }
      const appointmentToCreate = timeList.map((time) => {
        return {
          doctorId: doctor._id,
          hospitalId: doctor.hospitalId,
          ownerId: userId,
          timeStart: time.timeStart,
          timeEnd: time.timeEnd,
          status: "New",
        };
      });
      console.log(appointmentToCreate);

      const appointment = await Appointment.create(appointmentToCreate);
      return res.status(201).json({ status: true, data: appointment });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
  getAvailableTimeByDoctor: async (req, res) => {
    const { doctorId } = req.params;
    try {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res
          .status(404)
          .json({ status: false, message: "Doctor not found" });
      }
      const availableAppointments = await Appointment.find({
        doctorId,
        status: "New",
        timeStart: { $gte: new Date() },
      });
      
      return res
        .status(200)
        .json({ status: true, data: availableAppointments });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  getBookedTimeByDoctor: async (req, res) => {
    const { doctorId } = req.params;
    try {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res
          .status(404)
          .json({ status: false, message: "Doctor not found" });
      }
      const availableAppointments = await Appointment.find({
        doctorId,
        status: "Booked",
      });
      return res
        .status(200)
        .json({ status: true, data: availableAppointments });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  bookAppointment: async (req, res) => {
    const { appointmentId } = req.params;
    try {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res
          .status(400)
          .json({ status: false, message: "Appointment not found" });
      }
      const userId = req.user.id;
      
      const petId = req.body.petId;
      const reason = req.body.reason;
      if (appointment.status === "Booked") {
        return res
          .status(400)
          .json({ status: false, message: "Appointment already booked" });
      }

      appointment.status = "Booked";

      appointment.petId = petId;
      appointment.userId = userId;
      appointment.reason = reason || "";
      await appointment.save();
      return res.status(200).json({ status: true, data: appointment });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
};

const Appointment = require("../models/Appointment");
const AvailableTime = require("../models/AvailableTime");

module.exports = {
  createAppointmentTime: async (req, res) => {
    const newAppointmentTime = new AppointmentTime(
      doctorId,
      Date,
      timeStart,
      timeEnd
    );
    try {
      await newAppointmentTime.save();
      res.status(201).json({
        status: true,
        message: "AppointmentTime created successfully",
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  getAvailableSlots: async (req, res) => {
    try {
      const { doctorId } = req.params;
      const { date } = req.query;
      if (!date) {
        return res
          .status(422)
          .json({ status: false, message: "Date is required" });
      }

      const day = new Date(date);
      const available = await AvailableTime.findOne({ doctorId, date: day });
      if (!available) {
        return res.status(404).json({
          status: false,
          message: "No working hours set for this date",
        });
      }

      const dayStart = new Date(date + "T00:00:00.000Z");
      const dayEnd = new Date(date + "T23:59:59.999Z");
      const appointments = await Appointment.find({
        doctorId,
        status: "Confirmed",
        startTime: { $gte: dayStart, $lt: dayEnd },
      }).select("startTime endTime");

      const [h0, m0] = available.timeStart.split(":").map(Number);
      const [h1, m1] = available.timeEnd.split(":").map(Number);

      // 4) Нэг цаг тутам үүсгэх
      const slots = [];
      let slotStart = new Date(day);
      slotStart.setHours(h0, m0, 0, 0);

      const slotDurationMs = 60 * 60 * 1000; // 1 цаг

      // Цагын талбайг үүсгэж жагсаалтад нэмнэ
      while (
        slotStart.getHours() < h1 ||
        (slotStart.getHours() === h1 && slotStart.getMinutes() < m1)
      ) {
        const slotEnd = new Date(slotStart.getTime() + slotDurationMs);
        // slotEnd үнэхээр ажиллах цагийн дотор байгаа эсэх
        if (
          slotEnd.getHours() > h1 ||
          (slotEnd.getHours() === h1 && slotEnd.getMinutes() > m1)
        ) {
          break;
        }

        // 5) Appointment-тай мөргөлдөх эсэх шалгах
        const conflict = appointments.some(
          (appt) => slotStart < appt.endTime && slotEnd > appt.startTime
        );
        if (!conflict) {
          slots.push({
            startTime: slotStart.toISOString(),
            endTime: slotEnd.toISOString(),
          });
        }

        // Дараагийн slot
        slotStart = new Date(slotStart.getTime() + slotDurationMs);
      }

      return res.json({ status: true, data: slots });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
};

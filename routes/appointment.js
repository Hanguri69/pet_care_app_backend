const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post(
  "/doctor",
  verifyTokenAndAuthorization,
  appointmentController.createAppointmentFromDoctor
);
router.get(
  "/doctor/:doctorId",
  verifyTokenAndAuthorization,
  appointmentController.getAvailableTimeByDoctor
);
router.get(
  "/doctor/:doctorId/booked",
  verifyTokenAndAuthorization,
  appointmentController.getBookedTimeByDoctor
);
router.post(
  "/book/:appointmentId",
  verifyTokenAndAuthorization,
  appointmentController.bookAppointment
);

module.exports = router;

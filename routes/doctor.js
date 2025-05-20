const router = require("express").Router();
const doctorController = require("../controllers/doctorController");

router.get("/:hospitalId", doctorController.getDoctorByHospitalId);

module.exports = router;
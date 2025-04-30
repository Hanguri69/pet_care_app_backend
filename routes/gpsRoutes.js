const express = require("express");
const router = express.Router();
const gpsController = require("../controllers/gpsController");

router.post("/gps", gpsController.receiveGPSData);
router.get("/check", gpsController.getCheck);

module.exports = router;

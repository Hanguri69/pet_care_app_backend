const router = require("express").Router();
const hospitalController = require("../controllers/hospitalController");

router.post("/", hospitalController.createHospital);

module.exports = router;
const router = require("express").Router();
const hospitalController = require("../controllers/hospitalController");

router.post("/", hospitalController.createHospital);
router.get("/", hospitalController.getAllHospitals);

module.exports = router;
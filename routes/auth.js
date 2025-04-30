const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.createUser);
router.post("/admin/doctor/register", authController.createDoctor);

router.post("/login", authController.loginUser);
router.post("/doctor/login", authController.loginDoctor);

module.exports = router;

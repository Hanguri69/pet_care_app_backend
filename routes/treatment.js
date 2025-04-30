const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const treatmentController = require("../controllers/treatmentController");

// Бүх treatment-үүд


// Тухайн pet-д тохирох treatment-үүд
router.get(
  "/pets/:petId/treatments",
  verifyTokenAndAuthorization,
  treatmentController.getTreatmentsForPet
);

// (Админ) шинэ treatment нэмэх
router.post(
  "/",
  verifyTokenAndAuthorization,
  treatmentController.createTreatment
);

module.exports = router;

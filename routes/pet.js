const router = require("express").Router();
const petController = require("../controllers/petController");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/", verifyTokenAndAuthorization, petController.createPet);
router.post("/no-login", petController.createPetNoLogin);

router.post(
  "/location",
  verifyTokenAndAuthorization,
  petController.updatePetLocation
);

module.exports = router;

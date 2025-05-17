const router = require("express").Router();
const petController = require("../controllers/petController");

const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pets", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

router.post(
  "/",
  verifyTokenAndAuthorization,
  upload.array("photos", 5),
  petController.createPet
);
// router.post(
//   "/no-login",
//   upload.array("photos", 5),
//   petController.createPetNoLogin
// );
router.get("/", verifyTokenAndAuthorization, petController.getPetByOwner);
router.post(
  "/location",
  verifyTokenAndAuthorization,
  petController.updatePetLocation
);

module.exports = router;

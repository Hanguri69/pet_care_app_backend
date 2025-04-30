const router = require("express").Router();
const userController = require("../controllers/userController");
const {verifyTokenAndAuthorization} = require("../middlewares/verifyToken");


router.get(
  "/verify/:otp",
  verifyTokenAndAuthorization,
  userController.verifyAccount
);
router.get(
  "/verify_phone/:phone",
  verifyTokenAndAuthorization,
  userController.verifyPhone
);

router.get("/", verifyTokenAndAuthorization, userController.getUser);

module.exports = router;

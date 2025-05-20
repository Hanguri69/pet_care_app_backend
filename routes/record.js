const router = require("express").Router();
const recordController = require("../controllers/recordController");

const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/", verifyTokenAndAuthorization, recordController.createRecord);
router.get("/count/:petId", recordController.countRecordByPetId);
router.get("/:petId", recordController.getRecordsByPetId);

module.exports = router;

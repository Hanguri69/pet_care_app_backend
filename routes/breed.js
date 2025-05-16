const router = require("express").Router();
const breedController = require("../controllers/breedController");

router.post("/", breedController.createBreed);
router.get("/", breedController.getAllBreeds);

module.exports = router;

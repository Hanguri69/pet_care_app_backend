const router = require("express").Router();
const breedController = require("../controllers/breedController");

router.post("/", breedController.createBreed);

module.exports = router;
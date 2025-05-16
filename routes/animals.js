const router = require("express").Router();
const animalsController = require("../controllers/animalsController");

router.post("/", animalsController.createAnimal);
router.delete("/:id", animalsController.deleteAnimal);
router.get("/", animalsController.getAllAnimals);

module.exports = router;
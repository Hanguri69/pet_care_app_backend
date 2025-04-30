    const router = require("express").Router();
    const addressController = require("../controllers/addressController");
    
    router.post("/", addressController.addAddress);
    
    module.exports = router;
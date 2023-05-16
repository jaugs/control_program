const express = require("express");
const router = express.Router();

// Require controller modules.
const animal_controller = require("../controllers/animalController");
const animal_instance_controller = require("../controllers/animalinstanceController");
// GET catalog home page.
router.get("/", animal_controller.api_index);

//   ********************* API ROUTES **********************************************

// GET request for list of Animals API
router.get("/animals", animal_controller.animal_list_api)


router.get("/dino", animal_controller.dinosaur)
// GET request for one animalinstance.
//router.get("/animalinstance/:id", animal_instance_controller.animalinstance_detail);

// GET request for list of all animalinstance.
//router.get("/animalinstances", animal_instance_controller.animalinstance_list);





module.exports = router;
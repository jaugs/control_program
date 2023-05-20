const express = require("express");
const router = express.Router();

// Require controller modules.
const animal_controller = require("../controllers/animalController");
const animal_instance_controller = require("../controllers/animalinstanceController");


//   ********************* API ROUTES **********************************************

//GET main API
router.get("/", animal_controller.api_index);

// GET request for list of Animals API
router.get("/animals", animal_controller.animal_list_api)

// GET request for one Animal
router.get("/animals/:id", animal_controller.animal_detail_api)

// GET request for one animalinstance.
router.get("/animalinstance/:id", animal_instance_controller.animalinstance_detail_api);

// GET request for list of all animalinstance.
router.get("/animalinstances", animal_instance_controller.animalinstance_list_api);

//GET request for list of animalinstances by species
router.get("/animalinstances/species/:name", animal_instance_controller.animalinstance_byspecies_api);

// POST request to update Animal.
router.post("/animalinstance/:id/update", animal_controller.animal_update_post);

module.exports = router;
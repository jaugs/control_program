const express = require("express");
const router = express.Router();

// Require controller modules.
const animal_controller = require("../controllers/animalController");
const animal_instance_controller = require("../controllers/animalinstanceController");
const garage_controller = require("../controllers/garageController")

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
router.post("/animalinstance/:id/update", animal_instance_controller.animalinstance_update_post_api);

//GET request for list of Vehicles
router.get("/garage", garage_controller.garage_list_api)

//d
router.get("/garage/badge", garage_controller.badge_api)


//POST request to update Vehicle
router.post("/garage/:id/update", garage_controller.garage_update_post_api)

//POST request to create Vehicle
router.post("/garage/addVehicle", garage_controller.garage_create_post_api)

module.exports = router;
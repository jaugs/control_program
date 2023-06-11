const express = require("express");
const router = express.Router();

// Require controller modules.
const animal_controller = require("../controllers/animalController");
const animal_instance_controller = require("../controllers/animalinstanceController");
const garage_controller = require("../controllers/garageController");
const inventory_controller = require("../controllers/inventoryController");
//   ********************* API ROUTES **********************************************

//GET main API
router.get("/", animal_controller.api_index);


//**************// // ANIMAL SECTION // // ****************//

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

//**************// // GARAGE SECTION // // ****************//

//GET request for list of Vehicles
router.get("/garage", garage_controller.garage_list_api)

//POST request to update Vehicle
router.post("/garage/:id/update", garage_controller.garage_update_post_api)

//POST request to create Vehicle
router.post("/garage/addVehicle", garage_controller.garage_create_post_api)

//**************// // RIDES SECTION // // ****************//

//GET request for list of Rides
router.get("/rides", garage_controller.rides_list_api)

//POST request to update Ride
router.post("/rides/:id/update", garage_controller.rides_update_post_api)

//POST request to create Ride
router.post("/rides/addRide", garage_controller.rides_create_post_api)

//**************// // INVENTORY SECTION // // ****************//

//GET request for list of inventory by category
router.get("/inventory/category/:search", inventory_controller.inventory_category_search_api)

//POST request to update Inventory
router.post("/inventory/:id/update", inventory_controller.inventory_update_post_api)

//POST request to add new Item to Inventory
router.post("/inventory/addItem", inventory_controller.inventory_create_post_api)

//GET request for list of equipment
router.get("/inventory/equipment", inventory_controller.inventory_equipment_api)

//GET request for list of animal Feed
router.get("/inventory/feed", inventory_controller.inventory_feed_api)

//GET request for list of Lab Inventory
router.get("/inventory/lab", inventory_controller.inventory_lab_api)

//GET request for list of Resort Inventory
router.get("/inventory/resort", inventory_controller.inventory_resort_api)




module.exports = router;
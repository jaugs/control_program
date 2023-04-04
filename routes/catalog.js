const express = require("express");
const router = express.Router();

// Require controller modules.
const animal_controller = require("../controllers/animalController");
const animal_instance_controller = require("../controllers/animalinstanceController");

/// ANIMAL ROUTES ///

// GET catalog home page.
router.get("/", animal_controller.index);

// GET request for creating a Animal. NOTE This must come before routes that display Animal (uses id).
router.get("/animals/create", animal_controller.animal_create_get);

// POST request for creating Animal.
router.post("/animals/create", animal_controller.animal_create_post);

// GET request to delete Animal.
router.get("/animals/:id/delete", animal_controller.animal_delete_get);

// POST request to delete Animal.
router.post("/animals/:id/delete", animal_controller.animal_delete_post);

// GET request to update Animal.
router.get("/animals/:id/update", animal_controller.animal_update_get);

// POST request to update Animal.
router.post("/animals/:id/update", animal_controller.animal_update_post);

// GET request for one Animal.
router.get("/animals/:id", animal_controller.animal_detail);

// GET request for list of all Animal items.
router.get("/animals", animal_controller.animal_list);


/// animalINSTANCE ROUTES ///

// GET request for creating a AnimalInstance. NOTE This must come before route that displays AnimalInstance (uses id).
router.get(
  "/animalinstance/create",
  animal_instance_controller.animalinstance_create_get
);

// POST request for creating animalinstance.
router.post(
  "/animalinstance/create",
  animal_instance_controller.animalinstance_create_post
);

// GET request to delete animalinstance.
router.get(
  "/animalinstance/:id/delete",
  animal_instance_controller.animalinstance_delete_get
);

// POST request to delete animalinstance.
router.post(
  "/animalinstance/:id/delete",
  animal_instance_controller.animalinstance_delete_post
);

// GET request to update animalinstance.
router.get(
  "/animalinstance/:id/update",
  animal_instance_controller.animalinstance_update_get
);

// POST request to update animalinstance.
router.post(
  "/animalinstance/:id/update",
  animal_instance_controller.animalinstance_update_post
);

// GET request for one animalinstance.
router.get("/animalinstance/:id", animal_instance_controller.animalinstance_detail);

// GET request for list of all animalinstance.
router.get("/animalinstances", animal_instance_controller.animalinstance_list);

module.exports = router;
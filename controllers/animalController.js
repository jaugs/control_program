const Animal = require("../models/animal");
const AnimalInstance = require("../models/animalinstance");
const async = require("async");
const { body, validationResult } = require("express-validator");



exports.api_index = (req, res, next) => {
  res.send('dfdf')
}

// API list of all animals
exports.animal_list_api = (req, res, next) => {
  Animal.find({}, )
  .sort({name: 1})
  .exec(function (err, list_animals) {
    if (err) {
      return next(err);
    }
    res.json(list_animals) 
  })  
  }

exports.dinosaur = (req, res, next) => {
  res.send('dino')
}

exports.index = (req, res) => {
  async.parallel(
    {
      animal_count(callback) {
        Animal.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      animal_instance_count(callback) {
        AnimalInstance.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Control Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all animals.
exports.animal_list = function (req, res, next) {
  Animal.find({}, )
    .sort({ name: 1})
    .exec(function (err, list_animals) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("animal_list", { title: "Species List", animal_list: list_animals });
    });
};

// Display detail page for a specific animal.
exports.animal_detail = (req, res, next) => {
  async.parallel(
    {
      animal(callback) {
        Animal.findById(req.params.id)
          .exec(callback);
      },
      animal_instance(callback) {
        AnimalInstance.find({ animal: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.animal == null) {
        // No results.
        const err = new Error("Animal not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("animal_detail", {
        title: results.animal.name,
        animal: results.animal,
        animal_instances: results.animal_instance,
      });
    }
  );
};

// Display animal create form on GET.
exports.animal_create_get = (req, res, next) => {
  res.render("animal_form", { title: "Add New Species" });
};

// Handle animal create on POST.
exports.animal_create_post = [

  // Validate and sanitize fields.
  body("name", "Species name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("scientificname", "Scientific name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("current_version", "Version number must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("diet").escape(),
  body("synth_date", "Invalid Date")
    .optional({ checkFalsy: true})
    .isISO8601()
    .toDate(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("animal_form", {
        title: "Add New Species",
        name: req.body.name,
        scientificname: req.body.genres,
        current_version: req.body.current_version,
        diet: req.body.diet,
        synth_date: req.body.synth_date,
        description: req.body.description,
        errors: errors.array(),
          });
        
      
      return;
    }

    // Create an animal object with escaped and trimmed data.
    const animal = new Animal({
      name: req.body.name,
      scientificname: req.body.scientificname,
      current_version: req.body.current_version,
      diet: req.body.diet,
      synth_date: req.body.synth_date,
      description: req.body.description,
    });

   
    // Data from form is valid. Save animal.
    animal.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new animal record.
      res.redirect(animal.url);
    });
  },
];

// Display animal delete form on GET.
exports.animal_delete_get = (req, res, next) => {
  async.parallel(
    {
      animal(callback) {
        Animal.findById(req.params.id).exec(callback);
      },
      animal_instances(callback) {
        AnimalInstance.find({ animal: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.animal == null) {
        // No results.
        res.redirect("/catalog/animals");
      }
      // Successful, so render.
      res.render("animal_delete", {
        title: "Delete Animal",
        animal: results.animal,
        animal_instances: results.animal_instances,
      });
    }
  );
};

// Handle animal delete on POST.
exports.animal_delete_post = (req, res, next) => {
  async.parallel(
    {
      animal_instances(callback) {
        AnimalInstance.find({ animal: req.body.animalinstanceid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.animal_instances.length > 0) {
        // animal has instances. Render in same way as for GET route.
        res.render("animal_delete", {
          title: "Delete animal",
          animal: results.animal,
          animal_instances: results.animal_instances,
        });
        return;
      }
      // animal has no animal instances. Delete object and redirect to the list of animals.
      Animal.findByIdAndRemove(req.body.animalid, (err) => {
        if (err) {
          return next(err);
        }
        // Success - go to animal list
        res.redirect("/catalog/animals");
      });
    }
  );
};

// Display animal update form on GET.
exports.animal_update_get = (req, res, next) => {

  async.parallel(
    {
      animal(callback) {
        Animal.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.animal == null) {
        // No results.
        const err = new Error("Species not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("animal_form", {
        title: "Update Species",
        animal: results.animal,
      });
    }
  );
};

// Handle animal update on POST.
exports.animal_update_post = [
  // Validate and sanitize fields.
  body("name", "Species name must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
body("scientificname", "Scientific name must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
body("current_version", "Version number must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),
body("diet").escape(),
body("synth_date", "Invalid Date")
  .optional({ checkFalsy: true})
  .isISO8601()
  .toDate(),
body("description", "Description must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    const animal = new Animal({
      name: req.body.name,
      scientificname: req.body.scientificname,
      current_version: req.body.current_version,
      diet: req.body.diet,
      synth_date: req.body.synth_date,
      description: req.body.description,
      _id: req.params.id, //This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("animal_form", {
        title: "Update Species",
        name: req.body.name,
        scientificname: req.body.genres,
        current_version: req.body.current_version,
        diet: req.body.diet,
        synth_date: req.body.synth_date,
        description: req.body.description,
        errors: errors.array(),
          });
        
      return;
    }

    // Data from form is valid. Update the record.
    Animal.findByIdAndUpdate(req.params.id, animal, {}, (err, theanimal) => {
      if (err) {
        return next(err);
      }

      // Successful: redirect to book detail page.
      res.redirect(theanimal.url);
    });
  },
];
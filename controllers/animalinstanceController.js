const AnimalInstance = require("../models/animalinstance");
const { body, validationResult } = require("express-validator");
const Animal = require("../models/animal");

// Display list of all AnimalInstances.
exports.animalinstance_list = function (req, res, next) {
  AnimalInstance.find()
    .populate("animal")
    .exec(function (err, list_animalinstances) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("animalinstance_list", {
        title: "Animal Instance List",
        animalinstance_list: list_animalinstances,
      });
    });
};

// Display detail page for a specific AnimalInstance.
exports.animalinstance_detail = (req, res, next) => {
  AnimalInstance.findById(req.params.id)
    .populate("animal")
    .exec((err, animalinstance) => {
      if (err) {
        return next(err);
      }
      if (animalinstance == null) {
        // No results.
        const err = new Error("Animal not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("animalinstance_detail", {
        title: `Copy: ${animalinstance.animal.name}`,
        animalinstance,
      });
    });
};

// Display AnimalInstance create form on GET.
exports.animalinstance_create_get = (req, res, next) => {
  Animal.find({}, "name").exec((err, animals) => {
    if (err) {
      return next(err);
    }
    // Successful, so render.
    res.render("animalinstance_form", {
      title: "Add New Animal",
      animal_list: animals,
    });
  });
};

// Handle AnimalInstance create on POST.
exports.animalinstance_create_post = [

  // Validate and sanitize fields.
  body("animal", "Species must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("version", "Version must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("current_weight", "Weight must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("current_height", "Height must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),  
  body("birth_date", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("death_date", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a animalinstance object with escaped and trimmed data.
    const animalinstance = new AnimalInstance({
      animal: req.body.animal,
      imprint: req.body.imprint,
      version: req.body.version,
      current_weight: req.body.current_weight,
      current_height: req.body.current_height,
      birth_date: req.body.birth_date,
      death_date: req.body.death_date,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      Animal.find({}, "name").exec(function (err, animals) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render("animalinstance_form", {
          title: "Add New Animal",
          animal_list: animals,
          selected_animal: animalinstance.animal._id,
          errors: errors.array(),
          animalinstance,
        });
      });
      return;
    }

    // Data from form is valid.
    animalinstance.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new record.
      res.redirect(animalinstance.url);
    });
  },
];

// Display AnimalInstance delete form on GET.
exports.animalinstance_delete_get = (req, res, next) => {
  AnimalInstance.findById(req.params.id)
    .populate("animal")
    .exec(function (err, animalinstance) {
      if (err) {
        return next(err)
      }
      if (animalinstance == null) {
        // No results.
        res.redirect("/catalog/animalinstances");
      }
      // Successful, so render.
      res.render("animalinstance_delete", {
        title: "Delete Animal",
        animalinstance: animalinstance,
      });
    }
  );
};

// Handle AnimalInstance delete on POST.
exports.animalinstance_delete_post = function (req, res, next) {
  // Assume valid AnimalInstance id in field.
  AnimalInstance.findByIdAndRemove(req.body.id, function deleteAnimalInstance(err) {
    if (err) {
      return next(err);
    }
    // Success, so redirect to list of Animal Instances
    res.redirect("/catalog/animalinstances");
  });
};

// Display AnimalInstance update form on GET.
exports.animalinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle AnimalInstance update on POST.
exports.animalinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
const Animal = require("../models/animal");
const AnimalInstance = require("../models/animalinstance");
const async = require("async");

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
  Animal.find({}, "title author")
    .sort({ current_version: 1 })
    .populate("name")
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
exports.animal_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: animal create GET");
};

// Handle animal create on POST.
exports.animal_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: animal create POST");
};

// Display animal delete form on GET.
exports.animal_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: animal delete GET");
};

// Handle animal delete on POST.
exports.animal_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: animal delete POST");
};

// Display animal update form on GET.
exports.animal_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: animal update GET");
};

// Handle animal update on POST.
exports.animal_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: animal update POST");
};
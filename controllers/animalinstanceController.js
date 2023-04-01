const AnimalInstance = require("../models/animalinstance");

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
exports.animalinstance_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
};

// Display AnimalInstance create form on GET.
exports.animalinstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// Handle AnimalInstance create on POST.
exports.animalinstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

// Display AnimalInstance delete form on GET.
exports.animalinstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle AnimalInstance delete on POST.
exports.animalinstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: AnimalInstance delete POST");
};

// Display AnimalInstance update form on GET.
exports.animalinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle AnimalInstance update on POST.
exports.animalinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
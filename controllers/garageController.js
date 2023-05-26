const Garage = require("../models/garage");
const { body, validationResult } = require("express-validator");
const async = require("async");

// ***************************  API CONTROLLERS ****************************** \\

// GET list of animal instances
exports.garage_list_api = function (req, res, next) {
    Garage.find()
    .exec(function (err, list_vehicles) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.json(list_vehicles)
    });
};



//POST Vehicle Update
exports.garage_update_post_api = [

  //Validate/Sanitize
  body("useStatus", "Must be True/False").isBoolean().escape(),
  body("maintenanceStatus", "Must be True/False").isBoolean().escape(),
  body("milage", "Must be whole number").isNumeric(),
  body("next_service", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  body("service_history",).isArray(),
  body("*service_date", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  body("*service_notes",).trim().escape(),
  body("*service_type", "Service Type Cannot be Empty").trim().escape(),

  //Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);

    //Create a Vehicle Object with escaped/trimmed data and current ID
    var vehicle = new Garage({
      make: req.body.animal,
      badge: req.body.imprint,
      maintenanceStatus: req.body.maintenanceStatus,
      useStatus: req.body.useStatus,
      milage: req.body.milage,
      next_service: req.body.next_service,
      service_history: req.body.service_history,
      _id: req.params.id,
    });
    console.log(vehicle)

    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      Garage.find({},).exec(function (err, vehicles) {
        if (err) {
          return next(err);
        }
        res.json(vehicles);
      });
      return;
    } else {
      //Success Data is valid
      Garage.findByIdAndUpdate(
        req.params.id,
        vehicle,
        {},
        function(err, thevehicle) {
          if (err) {
            console.log(err)
            return next(err);
          }
          res.json('Success');
        }
      );
    }
  }

]


// (req, res, next) => {
//     console.log(req.body)
//    //const errors = validationResult(req);
//     //Create a AnimalInstance Object with escaped/trimmed data and current ID
//     var animalinstance = new Garage({
//       animal: req.body.animal,
//       imprint: req.body.imprint,
//       version: req.body.version,
//       current_weight: req.body.current_weight,
//       current_height: req.body.current_height,
//       birth_date: req.body.birth_date,
//       death_date: req.body.death_date,
//       _id: req.params.id,
//     });
//     console.log(animalinstance)
//       AnimalInstance.findByIdAndUpdate(
//         req.params.id,
//         animalinstance,
//         {},
//         function(err, theanimalinstance) {
//           if (err) {
//             return next(err);
//             }});}

//     exports.animalinstance_update_post = [

//      //Validate and Sanitixe
//   body("animal", "Species must be specified").trim().isLength({ min: 1 }).escape(),
//   body("imprint", "Imprint must be specified")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("version", "Version must be specified")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("current_weight", "Weight must be specified")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),
//   body("current_height", "Height must be specified")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),  
//   body("birth_date", "Invalid date")
//     .optional({ checkFalsy: true })
//     .isISO8601()
//     .toDate(),
//   body("death_date", "Invalid date")
//     .optional({ checkFalsy: true })
//     .isISO8601()
//     .toDate(),

//   //Process request after validation/sanitization
//   (req, res, next) => {
//     const errors = validationResult(req);

//     //Create a AnimalInstance Object with escaped/trimmed data and current ID
//     var animalinstance = new AnimalInstance({
//       animal: req.body.animal,
//       imprint: req.body.imprint,
//       version: req.body.version,
//       current_weight: req.body.current_weight,
//       current_height: req.body.current_height,
//       birth_date: req.body.birth_date,
//       death_date: req.body.death_date,
//       _id: req.params.id,
//     });

//     if (!errors.isEmpty()) {
//       //Erros, re render form with sanitized values/error messages
//       Animal.find({}, "title").exec(function (err, animals) {
//         if (err) {
//           return next(err);
//         }
//         res.render("animalinstance_form", {
//           title: "Update Animal",
//           animal_list: animals,
//           selected_animal: animalinstance.animal._id,
//           erros: errors.array(),
//           animalinstance: animalinstance,
//         });
//       });
//       return;
//     } else {
//       //Success Data is valid
//       AnimalInstance.findByIdAndUpdate(
//         req.params.id,
//         animalinstance,
//         {},
//         function(err, theanimalinstance) {
//           if (err) {
//             return next(err);
//           }
//           res.redirect(theanimalinstance.url);
//         }
//       );
//     }
//   },
// ];
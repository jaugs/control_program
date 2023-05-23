const Garage = require("../models/garage");
const { body, validationResult } = require("express-validator");
const async = require("async");

// ***************************  API CONTROLLERS ****************************** \\

// GET list of animal instances
exports.garage_list_api = function (req, res, next) {
    Garage.find()
    .populate("animal")
    .exec(function (err, list_animalinstances) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.json(list_animalinstances)
    });
};



//POST AnimalInstance Update
exports.garage_update_post_api = (req, res, next) => {
    console.log(req.body)
   //const errors = validationResult(req);

    //Create a AnimalInstance Object with escaped/trimmed data and current ID
    var animalinstance = new Garage({
      animal: req.body.animal,
      imprint: req.body.imprint,
      version: req.body.version,
      current_weight: req.body.current_weight,
      current_height: req.body.current_height,
      birth_date: req.body.birth_date,
      death_date: req.body.death_date,
      _id: req.params.id,
    });
    console.log(animalinstance)
      AnimalInstance.findByIdAndUpdate(
        req.params.id,
        animalinstance,
        {},
        function(err, theanimalinstance) {
          if (err) {
            
            return next(err);
            
          }
        }
      );
    }
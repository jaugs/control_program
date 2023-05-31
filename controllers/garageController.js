const Garage = require("../models/garage");
const { body, validationResult } = require("express-validator");
const async = require("async");
const { Query } = require("mongoose");
const { query } = require("express");

// ***************************  API CONTROLLERS ****************************** \\

// GET list of vehicle instances
exports.garage_list_api = function (req, res, next) {
    Garage.find()
    .exec(function (err, list_vehicles) {
      if (err) {
        return next(err);
      }
      // Successful, so render+
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
      make: req.body.make,
      badge: req.body.badge,
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
        });
    }
  }
]

exports.badge_api = async function (req, res, next) {
  console.log('hello')
  let prefix = 'JP'
    Garage.aggregate([
      {
        $match: {
          badge: {
            $regex: `^${prefix}`,
            $options: 'i' // Case-insensitive matching
          }
        }
      },
      {
        $project: {
          badge: 1,
          numericPart: {
            $toInt: { $substr: ['$badge', prefix.length, { $strLenCP: '$badge' }] }
          }
        }
      },
      {
        $sort: {
          badge: 1,
          numericPart: 1
        }
      }
    ]).exec(function (err, vehicles) {
      if (err) {
        return next(err);
      }
      console.log(vehicles)
      res.json(vehicles);
    });


  
};

async function getBadge (make) {

  return "JP01"
}

//POST for creating Vehicle
exports.garage_create_post_api =  [
  
  //Validate/Sanitize
  body("make", "Must be Jeep/Land Cruiser/Utility").isIn(["Jeep", "Land Cruiser", "Utility"]),
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
      make: req.body.make,
      badge: '',
      maintenanceStatus: req.body.maintenanceStatus,
      useStatus: req.body.useStatus,
      milage: req.body.milage,
      next_service: req.body.next_service,
      service_history: req.body.service_history,
      _id: req.params.id,
    });
    if (vehicle.make === "Jeep") {
      const badgeAbbrev = 'JP'
    } else if (vehicle.make === "Land Cruiser") {
      const badgeAbbrev = 'LC'
    } else if (vehicle.make === "Utility") {
      const badgeAbbrev = 'UT'
    }
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
      vehicle.save((err) => {
        if (err) {
          return next(err);
        }
        res.json(vehicle)
      })
  }
},
]
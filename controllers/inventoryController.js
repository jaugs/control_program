const { Item, Inventory } = require("../models/item")
const { body, validationResult } = require("express-validator");
const async = require("async");
const { Query } = require("mongoose");
const { query } = require("express");

// ***************************  API CONTROLLERS ****************************** \\

// GET list of all items in category
exports.inventory_list_api = function (req, res, next) {
    Item.find({category: req.params})
    .exec(function (err, list_inventory) {
      if (err) {
        return next(err);
      }
      // Successful, so render+
      res.json(list_inventory)
    });
};

//POST Vehicle Update
exports.item_update_post_api = [

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

//POST for creating Vehicle
exports.garage_create_post_api =  [
  
  //Validate/Sanitize
  body("make", "Must be Jeep/Land Cruiser/Utility").isIn(["Jeep", "Land Cruiser", "Utility"]),
  body("badge", "Must be String").trim().escape(),
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
    });

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
        res.json('Success')
      })
  }
},
]

//**********************************RIDE CONTROLLERS***********************************//

// GET list of Rides
exports.rides_list_api = function (req, res, next) {
  Ride.find()
  .exec(function (err, list_rides) {
    if (err) {
      return next(err);
    }
    // Successful, so render+
    res.json(list_rides)
  });
};

//POST Ride Update
exports.rides_update_post_api = [

//Validate/Sanitize
body("name", "Cannot be Empty").trim().escape(),
body("operational", "Must be True/False").isBoolean().escape(),
body("opening_date", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),

//Process request after validation/sanitization
(req, res, next) => {
  const errors = validationResult(req);

  //Create a Vehicle Object with escaped/trimmed data and current ID
  var ride = new Ride({
    name: req.body.name,
    operational: req.body.operational,
    opening_date: req.body.opening_date,
    _id: req.params.id,
  });
  console.log(ride)

  if (!errors.isEmpty()) {
    console.log(errors)
    //Erros, re render form with sanitized values/error messages
    Ride.find({},).exec(function (err, rides) {
      if (err) {
        return next(err);
      }
      res.json(rides);
    });
    return;
  } else {
    //Success Data is valid
    Ride.findByIdAndUpdate(
      req.params.id,
      ride,
      {},
      function(err, the_ride) {
       if (err) {
          console.log(err)
          return next(err); 
        }
        res.json('Success');
      });
  }
}
]

//POST for creating Vehicle
exports.rides_create_post_api =  [

//Validate/Sanitize
body("name", "Cannot be Empty").trim().escape(),
body("operational", "Must be True/False").isBoolean().escape(),
body("opening_date", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),

//Process request after validation/sanitization
(req, res, next) => {
  const errors = validationResult(req);
//Create a Vehicle Object with escaped/trimmed data and current ID
var ride = new Ride({
  name: req.body.name,
  operational: req.body.operational,
  opening_date: req.body.opening_date,
});

  if (!errors.isEmpty()) {
    console.log(errors)
    //Erros, re render form with sanitized values/error messages
    Ride.find({},).exec(function (err, rides) {
      if (err) {
        return next(err);
      }
      res.json(rides);
    });
    return;
  } else {
    //Success Data is valid
    ride.save((err) => {
      if (err) {
        return next(err);
      }
      res.json('Success')
    })
}
},
]

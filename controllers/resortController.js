const  Item  = require("../models/item")
const Room = require("../models/resort")
const { body, validationResult } = require("express-validator");
const async = require("async");
const { Query } = require("mongoose");
const { query } = require("express");

// ***************************  API CONTROLLERS ****************************** \\


//GET Resort Room Listing 
exports.room_list_api = function (req, res, next) {
    Room.find({}, )
    .sort({roomNumber: 1})
    .exec(function (err, list_rooms) {
        if (err) {
            return next(err);
        }
        res.json(list_rooms)
    });
};

//POST Resort Room Cleaning Update
exports.cleaning_update_post_api = [

  //Validate/Sanitize
  body("lastCleaned", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  
   // Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      Room.find({},).exec(function (err, item) {
        if (err) {
          return next(err);
        }
        res.json(req.body);
      });
      return;
    } else {
      Room.findByIdAndUpdate(req.body.id, {
        lastCleanedDate: req.body.lastCleanedDate,
      },{new: true}, function(err, theRoom) {
        if (err) {
          console.log(err)
          return next(err);
        }
        
        res.json('Success')
      });
    }
  }
]

//POST Resort Room Booking Update
exports.booking_update_post_api = [

  //Validate/Sanitize
  body("checkInDate", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  body("checkOutDate", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  body("guestName",).trim().escape(),
   // Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      Room.find({},).exec(function (err, item) {
        if (err) {
          return next(err);
        }
        res.json(req.body);
      });
      return;
    } else {
      Room.findByIdAndUpdate(req.body.id, {
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        status: 'booked',
        guestName: req.body.guestName
      },{new: true}, function(err, theRoom) {
        if (err) {
          console.log(err)
          return next(err);
        }
        
        res.json('Success')
      });
    }
  }
]

//POST Resort Room Check In Update
exports.checkin_update_post_api = [

  //Validate/Sanitize
  body("checkInDate", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  body("checkOutDate", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  body("guestName",).trim().escape(),
   // Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      Room.find({},).exec(function (err, item) {
        if (err) {
          return next(err);
        }
        res.json(req.body);
      });
      return;
    } else {
      Room.findByIdAndUpdate(req.body.id, {
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        status: 'checkedIn',
        guestName: req.body.guestName
      },{new: true}, function(err, theRoom) {
        if (err) {
          console.log(err)
          return next(err);
        }
        
        res.json('Success')
      });
    }
  }
]

//POST Resort Room Check Out Update
exports.checkout_update_post_api = [

  //Validate/Sanitize
  body("guestName",).trim().escape(),
   // Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      Room.find({},).exec(function (err, item) {
        if (err) {
          return next(err);
        }
        res.json(req.body);
      });
      return;
    } else {
      Room.findByIdAndUpdate(req.body.id, {
        checkInDate: null,
        checkOutDate: null,
        status: 'vacant',
        guestName: 'Vacant'
      },{new: true}, function(err, theRoom) {
        if (err) {
          console.log(err)
          return next(err);
        }
        
        res.json('Success')
      });
    }
  }
]

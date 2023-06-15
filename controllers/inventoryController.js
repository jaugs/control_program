const  Item  = require("../models/item")
const { body, validationResult } = require("express-validator");
const async = require("async");
const { Query } = require("mongoose");
const { query } = require("express");

// ***************************  API CONTROLLERS ****************************** \\

// GET list of all items in category
exports.inventory_category_search_api = function (req, res, next) {
  console.log(req.params.search)
    Item.find({category: req.params.search})
    .exec(function (err, list_inventory) {
      if (err) {
        console.log(err)
        return next(err);
      }
      // Successful, so render+
      res.json(list_inventory)
    });
};

//GET list of all Equipment Items
exports.inventory_equipment_api = function (req, res, next) {
    Item.find({category: ['Park_Equipment', 'Control_Equipment', 'Tools', 'IT_Equipment'] })
    .sort({category: 1})
    .exec(function (err, list_inventory) {
      if (err) {
        console.log(err)
        return next(err);
      }
      // Successful, so render+
      res.json(list_inventory)
    });
};

//GET list of all Feed Items
exports.inventory_feed_api = function (req, res, next) {
  Item.find({category: ['Feed'] })
  .sort({category: 1})
  .exec(function (err, list_inventory) {
    if (err) {
      console.log(err)
      return next(err);
    }
    // Successful, so render+
    res.json(list_inventory)
  });
};

//GET list of all Lab Items
exports.inventory_lab_api = function (req, res, next) {
  Item.find({category: ['Lab_Equipment'] })
  .sort({category: 1})
  .exec(function (err, list_inventory) {
    if (err) {
      console.log(err)
      return next(err);
    }
    // Successful, so render+
    res.json(list_inventory)
  });
};

//GET list of all Resort Items
exports.inventory_resort_api = function (req, res, next) {
  Item.find({category: ['Park_Merchandise', 'Lodge_Amenities'] })
  .sort({category: 1})
  .exec(function (err, list_inventory) {
    if (err) {
      console.log(err)
      return next(err);
    }
    // Successful, so render+
    res.json(list_inventory)
  });
};


//POST Inventory Item Update
exports.inventory_update_post_api = [

  //Validate/Sanitize
  body("category",).trim().escape(),
  body("sub_category",).trim().escape(),
  body("quantity", "Must be whole number").isNumeric(),
  body("price", "Must be whole number").isNumeric(),
  body("description",).trim().escape(),
  body("isAvailable", "Must be True/False").isBoolean().escape(),
  body("supplier",).trim().escape(),
  body("lotSize", "Must be whole number").isNumeric(),
 // 
  body("tags",).isArray(),
  
  //Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);

    //Create a Item Object with escaped/trimmed data and current ID
    var newItem = new Item({
      category: req.body.category,
      sub_category: req.body.sub_category,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
      isAvailable: req.body.isAvailable,
      supplier: req.body.supplier,
      lotSize: req.body.lotSize,
      lastOrdered: req.body.lastOrdered,
      tags: req.body.tags,
      _id: req.params.id,
    });
    console.log(newItem)

    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      Item.find({},).exec(function (err, item) {
        if (err) {
          return next(err);
        }
        res.json(req.body);
      });
      return;
    } else {
      //Success Data is valid
      Item.findByIdAndUpdate(
        req.params.id,
        newItem,
        {},
        function(err, theItem) {
         if (err) {
            console.log(err)
            return next(err); 
          }
          res.json('Success');
        });
    }
  }
]

exports.find_item_api = function (req, res, next) {
  console.log(req.params.search)
  Item.find({$text: {$search: req.params.search}})
  .sort({category: 1})
  .exec(function (err, list_inventory) {
    if (err) {
      console.log(err)
      return next(err);
    }
    console.log('hello')
    // Successful, so render+
    res.json(list_inventory)
  });
};

//POST for creating Item
exports.inventory_create_post_api =  [
  
  //Validate/Sanitize
  body("category",).trim().escape(),
  body("sub_category",).trim().escape(),
  body("quantity", "Must be whole number").isNumeric(),
  body("price", "Must be whole number").isNumeric(),
  body("description",).trim().escape(),
  body("isAvailable", "Must be True/False").isBoolean().escape(),
  body("supplier",).trim().escape(),
  body("lotSize", "Must be whole number").isNumeric(),
  body("tags",).isArray(),
//Process request after validation/sanitization
  (req, res, next) => {

    const errors = validationResult(req);
  //Create a Vehicle Object with escaped/trimmed data and current ID
  var newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    sub_category: req.body.sub_category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    isAvailable: req.body.isAvailable,
    supplier: req.body.supplier,
    lotSize: req.body.lotSize,
    tags: req.body.tags,
  });
  console.log(newItem)

    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      res.json(req.body)
      return;
    } else {
      //Success Data is valid
      newItem.save((err) => {
        if (err) {
          return next(err);
        }
        res.json('Success')
      })
  }
},
]

exports.inventory_order_post_api= [
  
  //Validate/Sanitize
  body("lastOrdered", "Invalid Date").optional({ checkFalsy: true }).isISO8601().toDate(),
  body("orderHistory.*.data",).optional({ checkFalsy: true }).isISO8601().toDate(),
  body("orderHistory.*.quantity",).isNumeric(),

//Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      //Erros, re render form with sanitized values/error messages
      Item.find({},).exec(function (err, item) {
        if (err) {
          return next(err);
        }
        res.json(req.body);
      });
      return;
    } else {
      Item.findByIdAndUpdate(req.body.id, {
        lastOrdered: req.body.lastOrdered,
        $push: {"orderHistory": req.body.orderHistory}
      },{new: true}, function(err, theItem) {
        if (err) {
          console.log(err)
          return next(err);
        }
        console.log(theItem._id)
        res.json('Success')
      });
    }
  }
]

const Animal = require("../models/animal");
const async = require("async");
const { body, validationResult } = require("express-validator");


exports.index = (req, res) => {
   res.render("users", {
    title: "Users",
        }); 
  };

// Display signup  form on GET.
exports.signup_get = (req, res, next) => {
    res.render("signup_form", { title: "New User Signup" });
  };

// Handle signup on POST.
exports.signup_post = [

    // Validate and sanitize fields.
    body("username", "username must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("password", "password must not be empty.")
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
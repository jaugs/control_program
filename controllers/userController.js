const User = require("../models/userModel");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.index = (req, res, next) => {
  User.find({}, "username")
    .sort({username: 1})
    .exec(function (err, list_users) {
      if (err) {
        return next(err);
      }
      res.render("users", {
        title: "Users", user_list: list_users, user: req.user
            }); 
    })  
  };

  //user detail GET
  exports.user_detail = (req, res, next) => {
    async.parallel(
      {
        user(callback) {
          User.findById(req.params.id)
            .exec(callback);
        },
      },
      (err, results) => {
        if (err) {
          return next(err);
        }
        if (results.user == null) {
          // No results.
          const err = new Error("User not found");
          err.status = 404;
          return next(err);
        }
        // Successful, so render.
        res.render("user_detail", {
          title: "User Detail:",
          user: results.user,
        });
      }
    );
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
  
        res.render("signup_form", {
          title: "Add New User",
          username: req.body.username,
          password: req.body.password,
          errors: errors.array(),
            });
        return;
      }
  
      //Create an user object with escaped and trimmed data.
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
  
      // Data from form is valid. Save User.
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful: redirect to new user record.
        res.redirect(user.url);
      });
    },
  ];

  exports.user_delete_get = (req, res, next) => {
    res.render("signup_form", { title: "New User Signup" });
  };

  exports.user_delete_post = (req, res, next) => {
    res.render("signup_form", { title: "New User Signup" });
  };

  exports.user_update_get = (req, res, next) => {
    res.render("signup_form", { title: "New User Signup" });
  };

  exports.user_update_post = (req, res, next) => {
    res.render("signup_form", { title: "New User Signup" });
  };
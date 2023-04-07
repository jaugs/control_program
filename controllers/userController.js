const User = require("../models/userModel");
var bcrypt = require('bcryptjs');
const async = require("async");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



// passport.use(
//   new LocalStrategy(async(username, password, done) => {
//     try {
//       const user = await User.findOne({ username: username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       };
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (res) {
//           // passwords match! log user in
//           return done(null, user)
//         } else {
//           // passwords do not match!
//           return done(null, false, { message: "Incorrect password" })
//         }
//       })
//       return done(null, user);
//     } catch(err) {
//       return done(err);
//     };
//   })
// );

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(async function(id, done) {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch(err) {
//     done(err);
//   };
// });

//GET user List
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
  // exports.user_detail = (req, res, next) => {
  //   async.parallel(
  //     {
  //       user(callback) {
  //         User.findById(req.params.id)
  //           .exec(callback);
  //       },
  //     },
  //     (err, results) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       if (results.user == null) {
  //         // No results.
  //         const err = new Error("User not found");
  //         err.status = 404;
  //         return next(err);
  //       }
  //       // Successful, so render.
  //       res.render("user_detail", {
  //         title: "User Detail:",
  //         user: results.user,
  //       });
  //     }
  //   );
  // };


// Display signup form on GET.
// exports.signup_get = (req, res, next) => {
//     res.render("signup_form", { title: "New User Signup" });
//   };

// Handle signup on POST.
// exports.signup_post = [
//     // Validate and sanitize fields.
//     body("username", "username must not be empty.")
//       .trim()
//       .isLength({ min: 1 })
//       .escape(),
//     body("password", "password must not be empty.")
//       .trim()
//       .isLength({ min: 1 })
//       .escape(),
  
    // Process request after validation and sanitization.
    //(req, res, next) => {
      // Extract the validation errors from a request.
     // const errors = validationResult(req);
  
     // if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
      //   res.render("signup_form", {
      //     title: "Add New User",
      //     username: req.body.username,
      //     password: req.body.password,
      //     errors: errors.array(),
      //       });
      //   return;
      // }
  
      //Create an user object with escaped and trimmed data.
      // const user = new User({
      //   username: req.body.username,
      //   password: req.body.password,
      // });
  
      // Data from form is valid. Save User.

    //  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        // if err, do something
        // if (err) {
        //   return next(err)
        // }
        // otherwise, store hashedPassword in DB
        // const user = new User({
        //   username: req.body.username,
        //   password: hashedPassword
        // });
        // user.save((err) => {
        //   if (err) {
        //     return next(err)
        //   }
         // res.render(user.url, { title: "Login In Success", user: user } )
      //     res.redirect(user.url)
      //   })
      // });


      // user.save((err) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   // Successful: redirect to new user record.
      //   res.redirect(user.url);
      // });
  //   },
  // ];

  // exports.user_login_get = (req, res, next) => {
  //   res.render('login', { title: "new llogin user" })
  // };

//  exports.user_login_post = (req, res, next) => {

//   //  res.render('test', { title: 'dlfgsdlf'} )

//     passport.authenticate("local", {
//       console.log(user),
//       successRedirect: "/users",
//       failureRedirect: "/users",
//    })
//    (req, res, next);
//   }

  //   {
  //   passport.authenticate("local", {
  //     successRedirect: "/catalog/animals",
  //     failureRedirect: "/catalog",
  //   })
  //  // res.render("users", { title: "new Login" })
  // }

  // exports.user_logout_get = (req, res, next) => {
  //   res.render('logout', { title: "User Signed Out" })
  // };

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
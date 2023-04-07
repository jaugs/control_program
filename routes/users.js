var express = require('express');
var router = express.Router();
var app = require('../app')
const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.index);

// GET request for creating a user. NOTE This must come before routes that display User (uses id).
// router.get("/signup", user_controller.signup_get);

// // POST request for creating User.
// router.post("/signup", user_controller.signup_post);

//GET request for log in user
//router.get("/login", user_controller.user_login_get);

//POST request for log in user
//router.post("/login", user_controller.user_login_post);

//get request for log out user
//router.get("/logout", user_controller.user_logout_get);

// GET request for one user.
//router.get("/:id", user_controller.user_detail);



// GET request to delete user.
router.get("/users/:id/delete", user_controller.user_delete_get);

// POST request to delete user.
router.post("/users/:id/delete", user_controller.user_delete_post);

// GET request to update user.
router.get("/users/:id/update", user_controller.user_update_get);

// POST request to update user.
router.post("/users/:id/update", user_controller.user_update_post);

module.exports = router;

var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController')

/* GET users listing. */
router.get('/', user_controller.index);

// GET request for creating a user. NOTE This must come before routes that display User (uses id).
router.get("/signup", user_controller.signup_get);

// POST request for creating User.
router.post("/signup", user_controller.signup_post);

module.exports = router;

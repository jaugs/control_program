var createError = require('http-errors');
var express = require('express');
require('dotenv').config()
var path = require('path');
const session = require("express-session");
const passport = require("passport");
var bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI 
const User = require("./models/userModel");
var cors = require('cors')


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          console.log('here')
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
        } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});


app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//Get current signed in user
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//View engine/ router setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.


//GET for login page
app.get("/users/login", (req, res) => res.render("login", { title: 'from app2'}));

//POST for login page
app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/users/login",
  })
);

//GET for logout page
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.log('22');
      return next(err);
    }
    res.render("logout", { title: "YOU HAVE LOGGED OUT"});
  });
});

//GET for signup page
app.get("/users/signup", (req, res) => res.render("signup_form", { title: 'from app'}));

//POST for signup page
app.post("/users/signup", async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err)
      } 
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      });
      const result = await user.save();
      res.redirect("/users");
    })
  } catch(err) {
    return next(err);
  };
});

//GET for index
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

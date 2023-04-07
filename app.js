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



main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
      return done(null, user);
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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

app.get("/users/login", (req, res) => res.render("login", { title: 'from app2'}));


app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/",
  })
);

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users")
  });
});


app.get("/users/signup", (req, res) => res.render("signup_form", { title: 'from app'}));


app.post("/users/signup", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    const result = await user.save();
    res.redirect("/");
  } catch(err) {
    return next(err);
  };
});

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
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

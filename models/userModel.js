const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const User = mongoose.model(
    "User",
    new Schema({
      username: { type: String, required: true },
      password: { type: String, required: true }
    })
  );


// Virtual for animals's URL
User.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/users/${this._id}`;
});


// Export model
module.exports = mongoose.model("User", User);
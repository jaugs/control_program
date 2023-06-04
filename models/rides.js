const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

var schemaOptions = {
  toObject: {
    virtuals: true
  }
  ,toJSON: {
    virtuals: true
  }
};

const RidesSchema = new Schema({
    name: { type: String, required: true},
    operational: { type: Boolean, required: true},
    opening_date: {type: Date},
  }, schemaOptions);
  
  RidesSchema.virtual("opening_date_formatted").get(function () {
    return DateTime.fromJSDate(this.opening_date).toLocaleString(DateTime.DATE_SHORTD);
  });


module.exports = mongoose.model("Rides", RidesSchema);
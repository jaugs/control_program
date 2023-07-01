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

const GarageSchema = new Schema({
    make: { type: String, required: true},
    badge: { type: String, required: true},
    useStatus: { type: Boolean, required: true},
    maintenanceStatus: {type: Boolean, required: true},
    milage: {type: Number, required: true},
    service_history: [{service_type: String, service_date: Date, service_notes: String}],
    next_service: {type: Date},
  }, schemaOptions);
  
  GarageSchema.virtual("next_service_formatted").get(function () {
    return DateTime.fromJSDate(this.next_service, {zone: 'utc'}).toLocaleString(DateTime.DATE_SHORTD);
  });

  GarageSchema.virtual("service_date_formatted").get(function () {
   return this.service_history.map(item => {return DateTime.fromJSDate(item.service_date, {zone: 'utc'}).toLocaleString(DateTime.DATE_SHORTD)})
  
  });
  
module.exports = mongoose.model("Garage", GarageSchema);
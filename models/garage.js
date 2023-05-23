const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;


const GarageSchema = new Schema({
    make: { type: String, required: true},
    model: { type: String, required: true},
    useStatus: { type: Boolean, required: true},
    maintenanceStatus: {type: Boolean, required: true},
    milage: {type: Number, required: true},
    service_history: [{service_type: String, service_date: Date, service_notes: String}],
    next_service: {type: Date},
  });
  
  GarageSchema.virtual("next_service_formatted").get(function () {
    return DateTime.fromJSDate(this.next_service).toLocaleString(DateTime.DATE_MED);
  });
  
module.exports = mongoose.model("Garage", GarageSchema);
const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const AnimalInstanceSchema = new Schema({
  animal: { type: Schema.Types.ObjectId, ref: "Animal", required: true }, // reference to the associated animal
  species: {type: String},
  imprint: { type: String, required: true },
  version: { type: String, required: true },
  current_height: { type: String, required: true },
  current_weight: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  birth_date: { type: Date, default: Date.now, required: true },
  death_date: { type: Date, default: null },
  medical: { type: Schema.Types.ObjectId, ref: "Medical" },
  location: { type: Array },
  diet_schedule: { type: Array },
});

AnimalInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/animalinstance/${this._id}`;
});

AnimalInstanceSchema.virtual("birth_date_formatted").get(function () {
  return DateTime.fromJSDate(this.birth_date, {zone: 'utc'}).toLocaleString(DateTime.DATE_MED);
});

AnimalInstanceSchema.virtual("death_date_formatted").get(function () {
  return DateTime.fromJSDate(this.death_date, {zone: 'utc'}).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("AnimalInstance", AnimalInstanceSchema);
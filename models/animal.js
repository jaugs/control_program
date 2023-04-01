const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  name: { type: String, required: true },
  scientificname: { type: String, required: true },
  current_version: { type: String, required: true },
  description: { type: String, required: false },
  diet:  {
    type: String,
    required: true,
    enum: ["Omnivore", "Carnivore", "Herbivore"],
    default: "Omnivore",
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  synth_date: { type: Date, default: Date.now }
});

// Virtual for animals's URL
AnimalSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/animals/${this._id}`;
});

AnimalSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Animal", AnimalSchema);
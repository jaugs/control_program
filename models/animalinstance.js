const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnimalInstanceSchema = new Schema({
  animal: { type: Schema.Types.ObjectId, ref: "Animal", required: true }, // reference to the associated book
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
  death_date: { type: Date, default: Date.now },
  medical: { type: Schema.Types.ObjectId, ref: "Medical" },
  location: { type: Array },
  diet_schedule: { type: Array },
});

AnimalInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/animalinstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("AnimalInstance", AnimalInstanceSchema);
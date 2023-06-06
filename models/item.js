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

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  sub_category: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  supplier: {
    type: String,
  },
  tags: {
    type: [String]
  },
  attributes: {
    type: Map,
    of: String
  },
  lotSize: {
    type: Number,
  },
  lastOrdered: {
    type: Date
  },
  orderHistory: {
    type: [{date: Date, quantity: Number}]
  },
  }, schemaOptions);
  
  ItemSchema.virtual("opening_date_formatted").get(function () {
    return DateTime.fromJSDate(this.lastOrdered).toLocaleString(DateTime.DATE_SHORTD);
  });

  ItemSchema.virtual("orderHistory_formatted").get(function () {
    return this.orderHistory.map(item => {return DateTime.fromJSDate(item.date).toLocaleString(DateTime.DATE_SHORTD)})
   
   });

   const InventorySchema = new Schema({
    items: [ItemSchema],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }, schemaOptions);
  
const Item = mongoose.model('Item', ItemSchema);
const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = { Item, Inventory };
const mongoose = require('mongoose');
const { DateTime } = require("luxon");

var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

const resortSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true
  },
  guestName: {
    type: String,
    required: true
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['booked', 'checkedIn', 'checkedOut', 'cancelled', 'vacant'],
    default: 'vacant'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastCleanedDate: {
    type: Date,
  },
}, schemaOptions);

resortSchema.virtual("checkIn_formatted").get(function () {
    return DateTime.fromJSDate(this.checkInDate).toLocaleString(DateTime.DATE_SHORTD);
  });
  resortSchema.virtual("checkOut_formatted").get(function () {
    return DateTime.fromJSDate(this.checkOutDate).toLocaleString(DateTime.DATE_SHORTD);
  });
  resortSchema.virtual("createdAt_formatted").get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_SHORTD);
  });
  resortSchema.virtual("lastCleaned_formatted").get(function () {
    return DateTime.fromJSDate(this.lastCleanedDate).toLocaleString(DateTime.DATE_SHORTD);
  });
  

const Room = mongoose.model('Room', resortSchema);

module.exports = Room;
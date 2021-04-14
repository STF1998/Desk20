const mongoose = require("mongoose");
const Joi = require('joi');

// tbc
var recordSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  }
});

// validate function to be added

module.exports = mongoose.model('Record', recordSchema);

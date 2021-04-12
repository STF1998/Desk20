const mongoose = require("mongoose");
const { validate } = require("./User");
/*
mongoose.connect("mongodb://localhost:27017/facebookauth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/
var recordSchema = mongoose.Schema({
  uid: String,
  timestamp: Date,
  timeSpent: Number
});

module.exports = mongoose.model('Record', userSchema);

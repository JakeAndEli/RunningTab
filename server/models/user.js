var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  fullName: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;

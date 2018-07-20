const mongoose = require("mongoose");
const crypto = require('crypto');

var userSchema = mongoose.Schema({
  fullName: String,
  username: String,
  hash: String,
  salt: String,
  admin: Boolean,
  venue: {type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
  qrCode: String,
  profilePic: String
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.setPassword = function (user, password) {
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
};

module.exports.validPassword = function (user, password) {
  var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  return user.hash === hash;
};

module.exports.updatePassword = function (user, callback) {

  var newPassword = user.newPassword;

  User.findById(user._id,function (err,user) {
    if(err){
      throw(err);
    }
    console.log(user);
    User.setPassword(user,newPassword);
    user.save(callback);

});
};

module.exports.checkCurrentPassword = function (user, callback) {

  var currentPassword = user.currentPassword;

  User.findById(user._id,function (err,user) {
    if(err){
      throw(err);
    }
    if(User.validPassword(user,currentPassword)){
      callback(true);
    } else {
      callback(false);
    }


    });


};

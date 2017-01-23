var mongoose = require("mongoose");

var Schema = mongoose.Schema;


// if you want to look up videos by this user, simply search all videos with the _user: user._id .

var UserSchema = new Schema({
  userName: String,
  email: String,
  profileUrl: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  title: String,
  // time_created: Number,
  duration: Number,
  _user: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Video = mongoose.model('Video', VideoSchema);
module.exports = Video;

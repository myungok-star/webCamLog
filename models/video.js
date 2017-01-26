var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  title: String,
  screenShot: String,
  videoLink: String
  // videoContent: Buffer
  // video:{
  //   type: Buffer,
  //   required: true
  // }
  // _user: {type: Schema.Types.ObjectId, ref: 'User'}
});


 // Schema({ file: { mime: String, bin: Buffer }});

 //
 // image:{
 //      type: Buffer,
 //      required: true
 //  }



var Video = mongoose.model('Video', VideoSchema);
module.exports = Video;

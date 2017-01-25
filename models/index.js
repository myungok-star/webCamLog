var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/webcamlog");

module.exports.User = require("./user.js");
module.exports.Video = require("./video.js");

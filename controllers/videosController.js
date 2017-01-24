/************
 * DATABASE *
 ************/

var db = require('../models');


// Get All Videos
function index(req, res) {
  db.Video.find({},function(err, videos) {
    if (err) {
      return console.log('Get videos error: ' + err);
    }
    res.json(videos);
  });
}


// Create a new video
function create(req, res) {
  db.Video.create(req.body, function(err, video) {
    if (err) { console.log('error', err); }
    res.json({video});
  });
}

// Get a single video
function show(req, res) {
  db.Video.findById(req.params.userId, function(err, foundVideo) {
    if(err) { console.log('videosController.show error', err); }
    console.log('videosController.show responding with', foundVideo);
    res.json(foundVideo);
  });
}


// Delete a current video
  function destroy(req, res) {
  db.Video.findOneAndRemove({_id: req.params.userId}, function(err, video) {
    console.log('sever error ', err)
    res.send("Successfully deleted!")
  });
}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy
};

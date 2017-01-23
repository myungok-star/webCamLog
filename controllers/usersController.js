/************
 * DATABASE *
 ************/

var db = require('../models');


// Get All Users
function index(req, res) {
  db.User.find({},function(err, users) {
    if (err) {
      return console.log('Get users error: ' + err);
    }
    res.json(users);
  });
}


// Create a new user
function create(req, res) {
  db.User.create(req.body, function(err, user) {
    if (err) { console.log('error', err); }
    res.json(user);
  });
}

// Get a single user
function show(req, res) {
  db.User.findById(req.params.userId, function(err, foundUser) {
    if(err) { console.log('usersController.show error', err); }
    console.log('usersController.show responding with', foundUser);
    res.json(foundUser);
  });
}


// Delete a current user
  function destroy(req, res) {
  db.User.findOneAndRemove({_id: req.params.userId}, function(err, user) {
    console.log('sever error ', err)
    res.send("Successfully deleted!")
  });
}

// export public methods here`
module.exports = {
  index: index,
  show: show,
  create: create,
  // update: update,
  destroy: destroy
};

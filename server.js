// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    controllers = require('./controllers'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Video = require('./models/video');

    // serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
// need to add this so that we can accept request payloads
app.use(bodyParser.json());

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

 // app.controller('UserShowController', function($scope) {
 //   $scope.user._id = user._id;
 // });


app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/users', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/users/:id', function(req, res) {
  res.sendFile(__dirname + '/views/index.html', { user: req.user });
});


// app.get('/users/:id', function(req, res){
//  res.render('index', { user: req.user });
// });

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});

// show user profile page
// app.get('/users/:id', function(req, res) {
//     // find the user currently logged in
//     if (req.session.userId === undefined) {
//         res.redirect('login')
//     }
//     User.findOne({
//         _id: req.session.userId
//     }, function(err, currentUser) {
//         res.render('index.html.ejs')
//     });
// });

/*
 * JSON API Endpoints
 */


app.get('/api', controllers.api.index);

app.get('/api/users', controllers.users.index);
app.get('/api/users/:userId', controllers.users.show);
app.post('/api/users', controllers.users.create);
app.delete('/api/users/:userId', controllers.users.destroy);
app.put('/api/users/:userId', controllers.users.update);

app.get('/api/videos/:userId', controllers.videos.index);
app.post('/api/videos/:userId', controllers.videos.create);
app.delete('/api/videos/:userId', controllers.videos.destroy);


// app.get('/templates/:name', function templates(req, res) {
//   var name = req.params.name;
//   res.sendFile(__dirname + '/views/templates/' + name + '.html');
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

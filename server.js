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


// // allow cross origin requests (optional)
// // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   next();
// });

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

 // app.controller('UserShowController', function($scope) {
 //   $scope.user._id = user._id;
 // });
app.use('/video-rec', express.static(__dirname + '/node_modules/video.js/dist/'));

app.get('/videos', function(req, res) {
 res.sendFile(__dirname + '/views/index.html');
});

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/users', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/users/:id', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/video-rec', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
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

app.get('/api/videos', controllers.videos.index);
app.get('/api/videos-rec/:userId', controllers.videos.show);
app.post('/api/videos', controllers.videos.create);
app.delete('/api/videos-rec/:userId', controllers.videos.destroy);


// app.get('/templates/:name', function templates(req, res) {
//   var name = req.params.name;
//   res.sendFile(__dirname + '/views/templates/' + name + '.html');
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

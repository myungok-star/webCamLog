// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    controllers = require('./controllers'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Video = require('./models/video');
var fs = require('file-system');
// var figaro = require('figaro').parse(figaroJSONPath, callback); // figaroJSONPath can be null and in such case default location of figaro.json is used


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

app.get('/videos/:id', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});


/*
 * JSON API Endpoints
 */


app.get('/api', controllers.api.index);

app.get('/api/users', controllers.users.index);
app.get('/api/users/:userId', controllers.users.show);
app.post('/api/users', controllers.users.create);
app.delete('/api/users/:userId', controllers.users.destroy);
app.put('/api/users/:userId', controllers.users.update);

app.put('/api/videos/:videoId', controllers.videos.update);
app.get('/api/videos', controllers.videos.index);
app.get('/api/videos/:videoId', controllers.videos.show);
app.post('/api/videos', controllers.videos.create);
app.delete('/api/videos/:videoId', controllers.videos.destroy);



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

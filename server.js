// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    controllers = require('./controllers'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Video = require('./models/video'),
    fs = require('file-system'),
    session = require('express-session');
// var figaro = require('figaro').parse(figaroJSONPath, callback); // figaroJSONPath can be null and in such case default location of figaro.json is used


// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
// need to add this so that we can accept request payloads
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
 saveUninitialized: true,
 resave: true,
 secret: 'SuperSecretCookie',
 cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

app.set('view engine', 'ejs');


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


/////bcrypt
 // get signup route
 app.get('/signup', function (req, res) {
  res.render('signup');
 });

 // get login route
 app.get('/login', function (req, res) {
  res.render('login');
 });


// post sign up route
app.post('/adimns', function (req, res) {
 console.log(req.body)
 // use the email and password to authenticate here
 User.createSecure(req.body.userName, req.body.email, req.body.profileUrl, req.body.password, function (err, newUser) {
   req.session.userId = newUser._id;
   res.redirect('/profile');
 });
});


app.get('/profile', function (req, res) {
// find user currently logged in
User.findOne({_id: req.session.userId}, function (err, currentUser) {
 res.render('profile.ejs', {user: currentUser})
 });
});

// authenticate and log in user
app.post('/sessions', function (req, res) {
 // use the email and password to authenticate here
 User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
   if (err){
     console.log('authentication error: ', err);
     res.status(500).send();
   } else {
     req.session.userId = loggedInUser._id;
     res.redirect('/profile');
   }
 });
});


// get logout route
app.get('/logout', function (req, res) {
// remove the session user id
req.session.userId = null;
// redirect to login
res.redirect('/login');
});



////////bcrypt


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

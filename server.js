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


////////////////////////////////////
//form File-upload-node

// app.get('/upload', function(req, res) {
//   res.sendFile(__dirname + '/views/templates/upload.html');
// });
// 
// var multer	=	require('multer');
//
// var storage	=	multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now());
//   }
// });
// var upload = multer({ storage : storage}).single('userPhoto');
//
// app.post('/api/videos',function(req,res){
// 	upload(req,res,function(err) {
// 		if(err) {
// 			return res.end("Error uploading file.");
// 		}
// 		res.end("File is uploaded");
// 	});
// });
// // end File-upload-node
// ////////////////////////////////////////
//
// ///////////////////////////////////////
// // This is from
// // "File Uploading in Dropbox using its API and Node.js - See more at: https://www.built.io/blog/file-uploading-in-dropbox-using-its-api-and-node-js#sthash.eLcKQEKN.dpuf"
//
// function generateRedirectURI(req) {
//   return url.format({
//     protocol: req.protocol,
//     host: req.headers.host,
//     pathname: app.path() + '/success'
//   });
// }
//
// function generateCSRFToken() {
//    return crypto.randomBytes(18).toString('base64').replace(/\//g, '-').replace(/+/g, '_');
// }
//
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
//
//   var csrfToken = generateCSRFToken();
//   res.cookie('csrf', csrfToken);
//   res.redirect(url.format({
//   protocol: 'https',
//   hostname: 'www.dropbox.com',
//   pathname: '1/oauth2/authorize',
//   query: { client_id: "",
//   response_type: 'code',
//   state: csrfToken,
//   redirect_uri: generateRedirectURI(req)
//         }
//   }));
// });
//
//
// app.get('/success', function (req, res) {
//   if (req.query.error) {
//     return res.send('ERROR ' + req.query.error + ': ' + req.query.error_description);
//   } if (req.query.state !== req.cookies.csrf) {
//     return res.status(401).send( 'CSRF token mismatch, possible cross-site request forgery attempt.' );
//   } request.post('https://api.dropbox.com/1/oauth2/token', {
//       form: { code: req.query.code, grant_type: 'authorization_code', redirect_uri: generateRedirectURI(req) },
//       auth: { user: "", pass: "" }
//     },
//     function (error, response, body) {
//       var data = JSON.parse(body);
//       if (data.error) {
//         return res.send('ERROR: ' + data.error);
//       } var token = data.access_token;
//         req.session.token=data.access_token;
//         request.post('https://api.dropbox.com/1/account/info', {
//           headers: { Authorization: 'Bearer ' + token } },
//           function (error, response, body) {
//             res.send('Logged in successfully as ' + JSON.parse(body).display_name + '.');
//           });
//       });
//   });
//
//
//   app.get('/uploadfile', function (req, res) { //var serverpath = p2o1rz1ns8hp85r;//file to be save at what path in server
//      var localpath = "./public/images";//path of the file which is to be uploaded
//      if (req.query.error) {
//        return res.send('ERROR ' + req.query.error + ': ' + req.query.error_description);
//      } fs.readFile(localpath,'utf8', function read(err, data) {
//        if (err) {
//          throw err;
//        } content = data; console.log(content);
//        fileupload(req.session.token,content);
//      });
//    });
//
//    function fileupload(token, content) {
//      request.put('https://api-content.dropbox.com/1/files_put/auto/', {
//        headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'text/plain'}, body:content}, function optionalCallback(err, httpResponse, bodymsg) {
//          if(err) {
//            console.log(err);
//          } else {
//            console.log(bodymsg);
//          }
//        });
//    } // end "File Uploading in Dropbox using its API and Node.js - See more at: https://www.built.io/blog/file-uploading-in-dropbox-using-its-api-and-node-js#sthash.eLcKQEKN.dpuf"
////////////////////////////////////////////



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
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

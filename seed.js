var db = require('./models');

var user_lists = [
  {
    userName: "Yasu",
    email: "yasu@mail.com",
    profileUrl: "http://i.imgur.com/Rwv0BRw.jpg"
  },
  {
    userName: "Derry",
    email: "derry@mail.com",
    profileUrl: "http://i.imgur.com/6FbobPG.png"
  },
  {
    userName: "Virginia",
    email: "virginia@mail.com",
    profileUrl: "http://i.imgur.com/6FbobPG.png"
  },
  {
    userName: "Casey",
    email: "casey@mail.com",
    profileUrl: "http://i.imgur.com/6FbobPG.png"
  },
  {
    userName: "Jonathan",
    email: "jonathan@mail.com",
    profileUrl: "http://i.imgur.com/6FbobPG.png"
  },
  {
    userName: "Vlad",
    email: "vlad@mail.com",
    profileUrl: "http://i.imgur.com/6FbobPG.png"
  }
];



var video_lists = [
  {
    title: "Logged by Yasu",
    screenShot: "http://i.imgur.com/i31yHmV.png",
    videoLink: ""
  },
  {
    title: "Logged by Derry",
    screenShot: "http://i.imgur.com/jVlA4Jt.png",
    videoLink: ""
  },
  {
    title: "Logged by Casey",
    screenShot: "http://i.imgur.com/HthwsLX.png",
    videoLink: "file:///Users/yasuyoshisakamoto/Desktop/videoLogMaterials/your-new-log%20(27).webm"
  },
  {
    title: "Logged by Vlad",
    screenShot: "http://i.imgur.com/GEDeR1L.png",
    videoLink: ""
  },
  {
    title: "Logged by Virginia",
    screenShot: "http://i.imgur.com/3t0bzLi.png",
    videoLink: ""
  },
  {
    title: "Logged by Jonathan",
    screenShot: "http://i.imgur.com/rQ0kgtr.png",
    videoLink: ""
  }
];

db.Video.remove({}, function(err, video) {
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('Removed all videos');
    db.Video.create(video_lists, function(err, video) {
      if (err) { return console.log('err', err); }
      console.log('Created ' + video.length + ' videos');
      process.exit();
    });
  }
});

db.User.remove({}, function(err, user) {
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('Removed all users');
    db.User.create(user_lists, function(err, user) {
      if (err) { return console.log('err', err); }
      console.log('Created ' + user.length + ' users');
      process.exit();
    });
  }
});

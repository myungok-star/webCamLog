console.log("app-record.js linked");

// var player = videojs('myVideo',
//   {
//       controls: true,
//       loop: false,
//       // dimensions of video.js player
//       width: 640,
//       height: 360,
//       plugins: {
//           record: {
//               maxLength: 10,
//               debug: true,
//               audio: true,
//               video: {
//                   // video constraints: set resolution of camera
//                   mandatory: {
//                       minWidth: 640,
//                       minHeight: 360,
//                   },
//               },
//               // dimensions of captured video frames
//               frameWidth: 640,
//               frameHeight: 360
//           }
//       }
//   });
// // error handling
// player.on('deviceError', function()
// {
//     console.log('device error:', player.deviceErrorCode);
// });
// player.on('error', function(error)
// {
//     console.log('error:', error);
// });
// // user clicked the record button and started recording
// player.on('startRecord', function()
// {
//     console.log('started recording!');
// });
// // user completed recording and stream is available
// player.on('finishRecord', function()
// {
//     // the blob object contains the recorded data that
//     // can be downloaded by the user, stored on server etc.
//     console.log('finished recording: ', player.recordedData);
//     player.recorder.saveAs({'video': 'my-video-file-name'});
// });

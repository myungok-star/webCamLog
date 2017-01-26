
angular
  .module('webcamlog')
  .controller('VideosShowController', VideosShowController);


VideosShowController.$inject = ['$http', '$routeParams', '$scope'];


function VideosShowController ($http, $routeParams, $scope) {
  console.log("VideosShowController linked!");
  var videoId = $routeParams.videoId;


  var vm = this;

  $http({
    method: 'GET',
    url: '/api/videos/' + videoId
    // console.log("USER: ", $scope.user);
  }).then(function successCallback(json) {
    $scope.video = json.data;
    console.log("this is response from VideosShowCtrl : ", json)
    vm.video = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the videos data', response);
  });


  vm.editVideo = function (video) {
    console.log("this is editVideo's video", video);
    $http({
      method: 'PUT',
      url: '/api/videos/'+ videoId,
      data: video
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deleteVideo = function (video) {
    $http({
      method: 'DELETE',
      url: '/api/videos/'+ videoId
    }).then(function successCallback(json) {
      var index = vm.videos.indexOf(video);
      vm.videos.splice(index,1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the video data', response);
    });
  }


}

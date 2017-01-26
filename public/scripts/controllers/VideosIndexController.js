console.log("VideosIndexController linked!");


angular
  .module('webcamlog')
  .controller('VideosIndexController', VideosIndexController);


  VideosIndexController.$inject = ['$http', '$routeParams', '$scope'];


  function VideosIndexController ($http, $routeParams, $scope) {
    var vm = this;
    vm.newVideo = {};
    var videoId = $routeParams.videoId;


    $http({
      method: 'GET',
      url: '/api/videos'
    }).then(function successCallback(response) {
      console.log("this is response from VideosIndexCtrl : ", response);
      vm.videos = response.data;
    }, function errorCallback(response) {
      console.log('There was an error getting the video data', response);
    });

    vm.createVideo = function () {
      $http({
        method: 'POST',
        url: '/api/videos',
        data: vm.newVideo,
      }).then(function successCallback(response) {
        vm.videos.push(response.data);
        // $('reset').val('');
      }, function errorCallback(response) {
        console.log('There was an error posting the video data', response);
      });
    }

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

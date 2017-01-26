console.log("VideosIndexController linked!");


angular
  .module('webcamlog')
  .controller('VideosIndexController', VideosIndexController);


  VideosIndexController.$inject = ['$http', '$routeParams', '$scope', '$location'];


  function VideosIndexController ($http, $routeParams, $scope, $location) {
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
        $location.path("/videos");
        // vm.videos.push(response.data);
      }, function errorCallback(response) {
        console.log('There was an error posting the video data', response);
      });
    }

  }

console.log("VideosIndexController linked!");


angular
  .module('webcamlog')
  .controller('VideosIndexController', VideosIndexController);


  VideosIndexController.$inject = ['$http', '$routeParams', '$scope'];


  function VideosIndexController ($http, $routeParams, $scope) {
    var vm = this;
    vm.newVideo = {};


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


    vm.deleteVideo = function (video) {
      $http({
        method: 'DELETE',
        url: '/api/videos-rec/'+ user._id
      }).then(function successCallback(json) {
        var index = vm.videos.indexOf(video);
        vm.videos.splice(index,1);
      }, function errorCallback(response) {
        console.log('There was an error deleting the video data', response);
      });
    }

  }

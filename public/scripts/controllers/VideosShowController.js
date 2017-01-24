
angular
  .module('webcamlog')
  .controller('VideosShowController', VideosShowController);


VideosShowController.$inject = ['$http', '$routeParams', '$scope'];


function VideosShowController ($http, $routeParams, $scope) {
  console.log("VideosShowController linked!");
  var userId = $routeParams.userId;


  var vm = this;

  $http({
    method: 'GET',
    url: '/api/video-rec/' + userId
    // console.log("USER: ", $scope.user);
  }).then(function successCallback(json) {
    $scope.video = json.data;
    console.log("this is response from VideosShowCtrl : ", json)
    vm.video = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the videos data', response);
  });


}

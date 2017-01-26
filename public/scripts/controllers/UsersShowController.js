
angular
  .module('webcamlog')
  .controller('UsersShowController', UsersShowController);


UsersShowController.$inject = ['$http', '$routeParams', '$scope'];


function UsersShowController ($http, $routeParams, $scope) {
  console.log("UsersShowController linked!");
  var userId = $routeParams.userId;


  var vm = this;
  vm.newUser = {};
  $http({
    method: 'GET',
    url: '/api/users/' + userId
    // console.log("USER: ", $scope.user);
  }).then(function successCallback(json) {
    $scope.user = json.data;
    console.log("this is response from UsersShowCtrl : ", json)
    vm.user = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the users data', response);
  });


  // vm.authenticateUser = function () {
  //   $http({
  //     method: 'POST',
  //     url: '/sessions',
  //     data: vm.newUser,
  //   }).then(function successCallback(response) {
  //     vm.users.push(response.data);
  //     // $('reset').val('');
  //   }, function errorCallback(response) {
  //     console.log('There was an error posting the user data', response);
  //   });
  // }

  vm.editUser = function (user) {
    $http({
      method: 'PUT',
      url: '/api/users/'+ user._id,
      data: user
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deleteUser = function (user) {
    $http({
      method: 'DELETE',
      url: '/api/users/'+ userId
    }).then(function successCallback(json) {
      var index = vm.users.indexOf(user);
      vm.users.splice(index,1)
      $window.location.href = '/users';
    }, function errorCallback(response) {
      console.log('There was an error deleting the user data', response);
    });
  }


  // vm.cancelEdit = function() {
  //   $location.path('/');
  // }

} //end UsersShowController

console.log("UsersShowController linked!");

angular
  .module('webcamlog')
  .controller('UsersShowController', UsersShowController);


UsersShowController.$inject = ['$http', '$routeParams'];


function UsersShowController ($http, $routeParams) {
  var vm = this;
  vm.newUser = {};

  $http({
    method: 'GET',
    url: '/api/users' + user._id
  }).then(function successCallback(response) {
    console.log("this is response from UsersShowCtrl : ", response)
    vm.user = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the users data', response);
  });


  vm.deleteUser = function (user) {
    $http({
      method: 'DELETE',
      url: '/api/users/'+ user._id
    }).then(function successCallback(json) {
      var index = vm.users.indexOf(user);
      vm.users.splice(index,1)
    }, function errorCallback(response) {
      console.log('There was an error deleting the user data', response);
    });
  }



  vm.editUser = function (user) {
    $http({
      method: 'PUT',
      url: '/api/users/'+user._id,
      data: user
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.cancelEdit = function() {
    $location.path('/');
  }

}

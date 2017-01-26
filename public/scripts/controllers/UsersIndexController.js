console.log("UsersIndexController linked!");

angular
  .module('webcamlog')
  .controller('UsersIndexController', UsersIndexController);


  UsersIndexController.$inject = ['$http', '$routeParams'];



  function UsersIndexController ($http, $routeParams, $scope, $setPristine) {
    console.log("UsersIndexController linked!");

    var vm = this;
    vm.newUser = {};


    $http({
      method: 'GET',
      url: '/api/users'
    }).then(function successCallback(response) {
      console.log("this is response from UsersIndexCtrl : ", response);
      vm.users = response.data;
    }, function errorCallback(response) {
      console.log('There was an error getting the users data', response);
    });


    vm.createUser = function () {
      $http({
        method: 'POST',
        url: '/api/users',
        data: vm.newUser,
      }).then(function successCallback(response) {
        vm.users.push(response.data);
        // $('reset').val('');
      }, function errorCallback(response) {
        console.log('There was an error posting the user data', response);
      });
    }


  }

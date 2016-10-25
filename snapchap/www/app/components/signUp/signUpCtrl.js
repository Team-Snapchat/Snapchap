angular.module('snapchat').controller('signUpCtrl', function ($scope, $stateParams, mainService, tempService, $state) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

  $scope.createUser = tempService.createUser;


$scope.createName = function(firstName, lastName){
  $scope.createUser.first_name = firstName;
  $scope.createUser.last_name = lastName;
  console.log(tempService.createUser);
  $state.go('signUp-username')
}

});

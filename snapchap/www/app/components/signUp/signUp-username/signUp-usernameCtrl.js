angular.module('snapchat').controller('signUp-usernameCtrl', function($scope, tempService, $state){

$scope.createUser = tempService.createUser;

  $scope.createUsername = function(username){
    $scope.createUser.username = username.toLowerCase();
    console.log(tempService.createUser);
    $state.go('signUp-password');
  }

})

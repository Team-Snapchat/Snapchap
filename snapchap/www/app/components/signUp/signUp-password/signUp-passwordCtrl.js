angular.module('snapchat').controller('signUp-passwordCtrl', function($scope, $state, tempService){

  $scope.createUser = tempService.createUser;

  $scope.createPassword = function(password){
    $scope.createUser.password = password;
    console.log(tempService.createUser);
    $state.go('signUp-email');
  }
})

angular.module('snapchat').controller('emailCtrl', function ($scope, $stateParams, mainService, $rootScope, $state) {

  mainService.hideMenu();
  $scope.email = ''

  $scope.currentEmail = $rootScope.userInfo.email;
  $rootScope.updateEmail = undefined;

  $scope.continueButton = false;
  $scope.stuff = function(email){
    if(email.length > 0){
      $scope.continueButton = true
      }
    else $scope.continueButton = false
  }

  $scope.addEmail = function(email){
    $rootScope.updateEmail = {id: $rootScope.userInfo.id, email: email}
    console.log($rootScope.updateEmail);
      $scope.email = ''
    $state.go('confirmPassword')

  }

});

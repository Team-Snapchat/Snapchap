angular.module('snapchat').controller('emailCtrl', function ($scope, $stateParams, mainService, $rootScope, $state) {

  mainService.hideMenu();

  $scope.currentEmail = $rootScope.userInfo.email;


  $scope.continueButton = false;
  $scope.stuff = function(email){
  if(email !== ''){
    $scope.continueButton = true
  } else $scope.continueButton = false
  }

$scope.addEmail = function(email){
  $rootScope.updateEmail = {id: $rootScope.userInfo.id, email: email}
  $state.go('confirmPassword')
}

});

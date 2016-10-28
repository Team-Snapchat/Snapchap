angular.module('snapchat').controller('passwordCtrl', function ($scope, $stateParams, mainService, $rootScope, $state) {

  mainService.hideMenu();

  $scope.continueButton = false;
  $scope.showContinueButton = function(password){
    if(password !== ''){
      $scope.continueButton = true
    } else $scope.continueButton = false
  }

  $scope.verifyPassword = function(password){
    mainService.comparePassword(password, $rootScope.userInfo.id).then(function(response){
      console.log(response);
      if(response.data){
        $state.go('newPassword')
      }
    })
  }

});

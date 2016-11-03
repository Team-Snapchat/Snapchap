angular.module('snapchat').controller('newPasswordCtrl', function($scope, mainService, $state, $rootScope){

  mainService.hideMenu();

  $scope.saveButton = false;
  $scope.weak = false;
  $scope.ok = false;
  $scope.strong = false;


  $scope.verifyPasswordStrength = function(newPassword){
    if(/\d/g.test(newPassword) && newPassword.length > 8){
        $scope.weak = false;
        $scope.ok = false;
        $scope.strong = true;
    }
    if(!(/\d/g.test(newPassword)) && newPassword.length > 12) {
      $scope.weak = false;
      $scope.ok = true;
      $scope.strong = false;
    }
    if (!(/\d/g.test(newPassword)) && newPassword.length < 12 && newPassword.length !== 0) {
      $scope.weak = true;
      $scope.ok = false;
      $scope.strong = false;
    }
    else if (newPassword === '') {
      $scope.weak = false;
      $scope.ok = false;
      $scope.strong = false;
    }
}

$scope.verifyPasswordsMatch = function(newPassword, confirmPassword){
  if (newPassword === confirmPassword) $scope.saveButton = true;
  else $scope.saveButton = false;
}

$scope.saveNewPassword = function(confirmPassword){
  mainService.updatePassword($rootScope.userInfo.id, confirmPassword).then(function(response){
    console.log(response);
    if (response.data) {
      mainService.getCurrentUser().then(function(userInfo){
        $rootScope.userInfo = userInfo;
        $state.go('settings')
      })
    }
  })
}

})

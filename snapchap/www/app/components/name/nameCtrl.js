angular.module('snapchat').controller('nameCtrl', function($scope, mainService, $state, $rootScope){

  mainService.hideMenu();

  $scope.saveButton = false;
  $scope.showSaveButton = function(firstName, lastName){
    if(firstName !== '' || lastName !== ''){
      $scope.saveButton = true
    } else $scope.saveButton = false
  }

  $scope.saveFirstName = function(firstName){
    if (firstName) {
      mainService.updateFirstName($rootScope.userInfo.id, firstName).then(function(response){
        if (response.data) {
          mainService.getCurrentUser().then(function(userInfo){
            $rootScope.userInfo = userInfo;
            $state.go('settings')
          })
        }
      })
    }
  }

  $scope.saveLastName = function(lastName){
    if (lastName) {
      mainService.updateLastName($rootScope.userInfo.id, lastName).then(function(response){
        if (response.data) {
          mainService.getCurrentUser().then(function(userInfo){
            $rootScope.userInfo = userInfo;
            $state.go('settings')
          })
        }
      })
    }
  }
})

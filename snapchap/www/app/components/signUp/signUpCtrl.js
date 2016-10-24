angular.module('snapchat').controller('signUpCtrl', function ($scope, $stateParams, mainService) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };


});

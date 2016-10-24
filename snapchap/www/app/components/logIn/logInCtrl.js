angular.module('snapchat').controller('logInCtrl', function ($scope, $stateParams, mainService) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

});

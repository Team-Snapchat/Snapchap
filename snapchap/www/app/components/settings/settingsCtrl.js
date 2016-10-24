angular.module('snapchat').controller('settingsCtrl', function ($scope, $stateParams, mainService) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

});

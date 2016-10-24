angular.module('snapchat').controller('addedMeCtrl', function ($scope, $stateParams, mainService) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };


});

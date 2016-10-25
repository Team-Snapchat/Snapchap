angular.module('snapchat').controller('editMessageCtrl', function ($scope, $stateParams, mainService, $rootScope) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  }

});

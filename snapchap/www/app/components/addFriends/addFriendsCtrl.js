angular.module('snapchat').controller('addFriendsCtrl', function ($scope, $stateParams, mainService) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

});

angular.module('snapchat').controller('myFriendsCtrl', function ($scope, $stateParams, mainService, $rootScope) {


  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

  $scope.getUserFriends = function(userId) {
    mainService.getUserFriends(userId).then(function(response) {
      console.log('response', response);
      $scope.friends = response;
      $scope.userId = userId;
    })
  }
  $scope.getUserFriends($rootScope.userInfo.id);

});

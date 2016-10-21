angular.module('snapchat').controller('myFriendsCtrl', function ($scope, $stateParams, service) {

  $scope.getUserFriends = function(userId) {
    service.getUserFriends(userId).then(function(response) {
      console.log('response', response);
      $scope.friends = response;
      $scope.userId = userId;
    })
  }
  $scope.getUserFriends(1);

});

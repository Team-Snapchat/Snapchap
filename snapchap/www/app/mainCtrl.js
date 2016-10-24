angular.module('snapchat').controller('mainCtrl', function ($scope, $stateParams, $state, $rootScope, $http) {

  $scope.takePhoto = function() {
    $state.current.name === 'camera' ? console.log('PHOTO!') : 0;
  }
  
  $rootScope.accountInfo = []
  $rootScope.friends = []
  $rootScope.pendingMessages = []
  $rootScope.pendingFriendRequests = []

  var socket = io.connect();

    socket.on('getAccountInfo', function(accountInfo){
      $rootScope.accountInfo.push(accountInfo);
      $scope.$digest();
    })

    socket.on('getFriends', function(friends){
      $rootScope.friends.push(friends); 
      $scope.$digest();
    })

    socket.on('getPendingMessages', function(pendingMessages){
      console.log(pendingMessages)
      $rootScope.pendingMessages.push(pendingMessages)
      $scope.$digest();
    })

    socket.on('getPendingFriendRequests', function(pendingFriendRequests){
      $rootScope.pendingFriendRequests.push(pendingFriendRequests)
      $scope.$digest();
    })

 
 

});

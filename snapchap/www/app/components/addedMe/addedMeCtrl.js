angular.module('snapchat').controller('addedMeCtrl', function ($scope, $rootScope, $stateParams, mainService) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

  $scope.respondToFriendRequest = function(initiatorId){
    mainService.replyToFriendRequest({initiatorId: initiatorId, acceptorId: $rootScope.userInfo.id}).then(function(response){
      console.log(response.data)
      if(response.data){
        mainService.getPendingFriendRequests($rootScope.userInfo.id).then(function(response){
        $rootScope.pendingFriendRequests = response.data;
         })
      }
   
    })
  }

});

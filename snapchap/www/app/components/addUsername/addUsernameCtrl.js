angular.module('snapchat').controller('addUsernameCtrl', function ($scope, $rootScope, $stateParams, mainService) {
  $scope.flag = false;
  mainService.hideMenu();
  $scope.users = [];

  $scope.getSearchResults = function(searchText){
    $scope.hideExplanation = true;
    if(searchText){
      $scope.hideExplanation = true;
      var query = "%"+searchText+"%"
      mainService.getUsername(query, $rootScope.userInfo.id).then(function(results){
        console.log(results.data)
        $scope.users = results.data;
      })
    }
    else {
      $scope.users = []
      $scope.hideExplanation = false;
    }
  }
  $scope.sendFriendRequest = function(acceptor){

    mainService.sendFriendRequest({initiatorId :$rootScope.userInfo.id, acceptorId: acceptor}).then(function(flag){
      $scope.flag = flag;
      $scope.getSearchResults($scope.searchText)
    })
  }
});

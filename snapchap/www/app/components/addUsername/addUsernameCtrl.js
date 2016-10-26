angular.module('snapchat').controller('addUsernameCtrl', function ($scope, $rootScope, $stateParams, mainService) {

  mainService.hideMenu();
  $scope.users = [];
  $scope.getSearchResults = function(searchText){
    if(searchText){
      var TEST = "%"+searchText+"%"
      mainService.getUsername(TEST).then(function(results){
        console.log(results.data)
        $scope.users = results.data;
      })
    }
    else $scope.users = []
    
  } 
});

angular.module('snapchat').controller('profileCtrl', function ($scope,$rootScope, $stateParams, mainService, $state) {

  $scope.hideMenu = function() {
    document.getElementById('index-html__nav-bottom').style.display = 'none';
  };


  mainService.showMenu();
  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').addClass('profile-nav');

  $scope.getAddedme = function(){
    mainService.getPendingFriendRequests($rootScope.userInfo.id).then(function(response){
      $rootScope.pendingFriendRequests = response.data;
    })
  }

  $scope.goToView = function(view) {
    $state.go(view);
  }




});

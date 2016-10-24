angular.module('snapchat').controller('profileCtrl', function ($scope, $stateParams, mainService) {

  // $scope.hideMenu = function() {
  //   document.getElementById('index-html__nav-bottom').style.display = 'none';
  // };


  mainService.showMenu();
  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').addClass('profile-nav');


});

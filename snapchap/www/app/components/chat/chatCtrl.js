angular.module('snapchat').controller('chatCtrl', function ($scope, $stateParams, mainService) {

  mainService.showMenu();
  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').addClass('chatty-nav');



});

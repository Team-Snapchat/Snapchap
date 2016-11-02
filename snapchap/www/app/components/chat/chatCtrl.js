angular.module('snapchat').controller('chatCtrl', function ($scope, $stateParams, mainService, $rootScope, $state) {

  mainService.showMenu();

  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').addClass('chatty-nav');


  mainService.getPendingMessageIds($rootScope.userInfo.id).then(function(response) {
    $rootScope.pendingMessages = response.data;
  });


  var canvas = document.getElementById('message-canvas');
  var context = canvas.getContext('2d');
  var image = new Image();

  $scope.getMessage = function(messageId) {
    mainService.getMessage(messageId).then(function(response) {
      setTimeout(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        mainService.deleteMessage(messageId).then(function(response) {
          mainService.getPendingMessageIds($rootScope.userInfo.id).then(function(response) {
            $rootScope.pendingMessages = response.data;
          });
        });
      }, 10500);
      console.log('got message back', response.data);
      image.onload = function() {
        context.drawImage(image, 0, 0);
      }
      image.src = response.data[0].message;
    });
  }


  $scope.goToView = function(view) {
    $state.go(view);
  }


});

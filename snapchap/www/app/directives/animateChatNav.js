angular.module('snapchat')
.directive('animateChatNav', function() {
  return {

    restrict: 'AE',

    controller: function($scope, $state) {

      var navBtns = $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn');

      $scope.addChattyNav = function() {
        navBtns.addClass('chatty-nav');
      }
      $scope.removeChattyNav = function() {
        navBtns.removeClass('chatty-nav');
      }


    }

  };
});

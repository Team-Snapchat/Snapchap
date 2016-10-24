angular.module('snapchat')
.directive('animateProfileNav', function() {
  return {

    restrict: 'AE',

    controller: function($scope, $state) {

      var navBtns = $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn');

      $scope.addProfileNav = function() {
        navBtns.addClass('profile-nav');
      }
      $scope.removeProfileNav = function() {
        navBtns.removeClass('profile-nav');
      }


    }

  };
});

angular.module('snapchat').controller('settingsCtrl', function ($scope, $rootScope, $stateParams, mainService, $auth, $state) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

  $scope.logout = function(){
    $rootScope.disconnect()
    $auth.logout()
      .then(function() {
        console.log('You have been logged out');
        $state.go('logInSignUp');
  });

  $scope.goToView = function(view) {
    $state.go(view);
  };
}

});

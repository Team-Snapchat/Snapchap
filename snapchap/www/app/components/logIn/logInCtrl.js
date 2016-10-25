angular.module('snapchat').controller('logInCtrl', function ($scope, $rootScope, $stateParams, mainService, $auth, $state) {

  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  };

  //login w/jsonwebtokens
    $scope.login = function(email, password) {
      console.log(email, password);
      $auth.login({
        email: email,
        password: password,
      }).then(function (response) {
        console.log("signUpCtrl:", response);
        if(response.status === 200){
          $auth.setToken(response)
          mainService.getCurrentUser().then(function(userInfo){
            $rootScope.userInfo = userInfo;
          })
          $state.go('camera');
        }
      }).catch(function (response) {
        console.log("signUpCtrl Error:", response);
      });
    };


});

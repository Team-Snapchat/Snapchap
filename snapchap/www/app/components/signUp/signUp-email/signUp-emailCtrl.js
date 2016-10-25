angular.module('snapchat').controller('signUp-emailCtrl', function($scope, $state, tempService, $auth){

  $scope.createUser = tempService.createUser;

  $scope.createEmail = function(email){
    $scope.createUser.email = email;
    console.log(tempService.createUser);
    $auth.signup(tempService.createUser).then(function (response) {
      console.log("signUpCtrl:", response);
      $state.go('camera');
    }).catch(function (response) {
      console.log("signUpCtrl Error:", response);
    });
  };

})

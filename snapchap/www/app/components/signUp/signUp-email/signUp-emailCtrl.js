angular.module('snapchat').controller('signUp-emailCtrl', function($scope, $state, tempService, $auth, mainService, $rootScope){

  $scope.createUser = tempService.createUser;

  var password = $scope.createUser.password;

  $scope.createEmail = function(email){
    $scope.createUser.email = email;
    console.log(tempService.createUser);
    $auth.signup(tempService.createUser).then(function (response) {
      console.log("signUpCtrl:", response);
      setTimeout(function() {
        $scope.login(email, password);
      }, 500);
    }).catch(function (response) {
      console.log("signUpCtrl Error:", response);
    });
  };


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

})

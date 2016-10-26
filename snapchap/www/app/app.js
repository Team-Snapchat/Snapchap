angular.module('snapchat', ['ionic', 'ngCordova', 'satellizer'])

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $authProvider){

    $ionicConfigProvider.backButton.text('').previousTitleText(false);

    $urlRouterProvider.otherwise('/loginsignup');

  var skipIfLoggedIn = ['$q', '$location', '$auth', function($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      $location.path('/camera')
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }];

  var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/loginsignup');
    }
      return deferred.promise;
  }];

    $stateProvider
    .state('addedMe', {
      url: '/addedme',
      templateUrl: 'app/components/addedMe/addedMe.html',
      controller: 'addedMeCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('addFriends', {
      url: '/addfriends',
      templateUrl: 'app/components/addFriends/addFriends.html',
      controller: 'addFriendsCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('addUsername', {
      url: '/addusername',
      templateUrl: 'app/components/addUsername/addUsername.html',
      controller: 'addUsernameCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('birthday', {
      url: '/birthday',
      templateUrl: 'app/components/birthday/birthday.html',
      controller: 'birthdayCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('camera', {
      url: '/camera',
      templateUrl: 'app/components/camera/camera.html',
      controller: 'cameraCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('chat', {
      url: '/chat',
      templateUrl: 'app/components/chat/chat.html',
      controller: 'chatCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('editMessage', {
      url: '/editmessage',
      templateUrl: 'app/components/editMessage/editMessage.html',
      controller: 'editMessageCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('email', {
      url: '/email',
      templateUrl: 'app/components/email/email.html',
      controller: 'emailCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('logIn', {
      url: '/login',
      templateUrl: 'app/components/logIn/logIn.html',
      controller: 'logInCtrl',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state('logInSignUp', {
      url: '/loginsignup',
      templateUrl: 'app/components/logInSignUp/logInSignUp.html',
      controller: 'logInSignUpCtrl',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state('name', {
      url: '/name',
      templateUrl: 'app/components/name/name.html',
      controller: 'nameCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('newPassword', {
      url: '/newPassword',
      templateUrl: 'app/components/newPassword/newPassword.html',
      controller: 'newPasswordCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('myFriends', {
      url: '/myfriends',
      templateUrl: 'app/components/myFriends/myFriends.html',
      controller: 'myFriendsCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    // .state('nav', {
    //   url: '/nav',
    //   templateUrl: 'app/components/nav/nav.html',
    //   controller: 'navCtrl'
    // })

    .state('password', {
      url: '/password',
      templateUrl: 'app/components/password/password.html',
      controller: 'passwordCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'app/components/profile/profile.html',
      controller: 'profileCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('sendTo', {
      url: '/sendto',
      templateUrl: 'app/components/sendTo/sendTo.html',
      controller: 'sendToCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('settings', {
      url: '/settings',
      templateUrl: 'app/components/settings/settings.html',
      controller: 'settingsCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })

    .state('signUp', {
      url: '/signUp',
      templateUrl: 'app/components/signUp/signUp.html',
      controller: 'signUpCtrl',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state('signUp-email', {
      url: '/signUp-email',
      templateUrl: 'app/components/signUp/signUp-email/signUp-email.html',
      controller: 'signUp-emailCtrl',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state('signUp-password', {
      url: '/signUp-password',
      templateUrl: 'app/components/signUp/signUp-password/signUp-password.html',
      controller: 'signUp-passwordCtrl',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state('signUp-username', {
      url: '/signup-username',
      templateUrl: 'app/components/signUp/signUp-username/signUp-username.html',
      controller: 'signUp-usernameCtrl',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })

    .state('watchMessages', {
      url: '/watchmessages',
      templateUrl: 'app/components/watchMessages/watchMessages.html',
      controller: 'watchMessagesCtrl',
      resolve: {
          loginRequired: loginRequired
        }
    })


    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';

})



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the form inputs)
    // if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //   cordova.plugins.Keyboard.disableScroll(true);
    // }
    ionic.Platform.fullScreen();
    // if (window.StatusBar) {
                        // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
      // StatusBar.backgroundColorByHexString("#333");
      // console.log('StatusBar:', StatusBar);
      // console.log('isInvisible:', StatusBar.isInvisible);
      // showStatusBar(false);
      // $cordovaStatusBar.hide();
      // StatusBar.hide();
    // }

    // if(ionic.Platform.isWebView()) {
      //  $cordovaStatusbar.styleHex('#FF0000'); //Do what you want
    //  }


  });
})

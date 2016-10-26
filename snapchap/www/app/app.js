angular.module('snapchat', ['ionic', 'ngCordova'])

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider){

    $ionicConfigProvider.backButton.text('').previousTitleText(false);

    $urlRouterProvider.otherwise('/camera');

    $stateProvider
    .state('addedMe', {
      url: '/addedme',
      templateUrl: 'app/components/addedMe/addedMe.html',
      controller: 'addedMeCtrl'
    })

    .state('addFriends', {
      url: '/addfriends',
      templateUrl: 'app/components/addFriends/addFriends.html',
      controller: 'addFriendsCtrl'
    })

    .state('addUsername', {
      url: '/addusername',
      templateUrl: 'app/components/addUsername/addUsername.html',
      controller: 'addUsernameCtrl'
    })

    .state('birthday', {
      url: '/birthday',
      templateUrl: 'app/components/birthday/birthday.html',
      controller: 'birthdayCtrl'
    })

    .state('camera', {
      url: '/camera',
      templateUrl: 'app/components/camera/camera.html',
      controller: 'cameraCtrl'
    })

    .state('chat', {
      url: '/chat',
      templateUrl: 'app/components/chat/chat.html',
      controller: 'chatCtrl'
    })

    .state('editMessage', {
      url: '/editmessage',
      templateUrl: 'app/components/editMessage/editMessage.html',
      controller: 'editMessageCtrl'
    })

    .state('email', {
      url: '/email',
      templateUrl: 'app/components/email/email.html',
      controller: 'emailCtrl'
    })

    .state('logIn', {
      url: '/login',
      templateUrl: 'app/components/logIn/logIn.html',
      controller: 'logInCtrl'
    })

    .state('logInSignUp', {
      url: '/loginsignup',
      templateUrl: 'app/components/logInSignUp/logInSignUp.html',
      controller: 'logInSignUpCtrl'
    })

    .state('myFriends', {
      url: '/myfriends',
      templateUrl: 'app/components/myFriends/myFriends.html',
      controller: 'myFriendsCtrl'
    })

    // .state('nav', {
    //   url: '/nav',
    //   templateUrl: 'app/components/nav/nav.html',
    //   controller: 'navCtrl'
    // })

    .state('password', {
      url: '/password',
      templateUrl: 'app/components/password/password.html',
      controller: 'passwordCtrl'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'app/components/profile/profile.html',
      controller: 'profileCtrl'
    })

    .state('sendTo', {
      url: '/sendto',
      templateUrl: 'app/components/sendTo/sendTo.html',
      controller: 'sendToCtrl'
    })

    .state('settings', {
      url: '/settings',
      templateUrl: 'app/components/settings/settings.html',
      controller: 'settingsCtrl'
    })

    .state('signUp', {
      url: '/signup',
      templateUrl: 'app/components/signUp/signUp.html',
      controller: 'signUpCtrl'
    })

    .state('watchMessages', {
      url: '/watchmessages',
      templateUrl: 'app/components/watchMessages/watchMessages.html',
      controller: 'watchMessagesCtrl'
    })


})


.run(function($ionicPlatform, $cordovaStatusbar) {



  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the form inputs)


    // for (var prop in ionic.Platform) {
    //     alert(prop);
    // }



    //
    // if (statusBarOverlaysWebView) {
    //   alert('overlay');
    // }

    var isIOS = ionic.Platform.isIOS();
    // alert (isIOS);

    ionic.Platform.showStatusBar(false);
    // ionic.Platform.fullscreen(true, false);
    // ionic.Platform.fullscreen(false, true);
    // ionic.Platform.fullscreen();

    // if (!StatusBar.isVisible) {
    //   alert('not visible!')
    // }


    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    // ionic.Platform.fullScreen();
    if (window.StatusBar) {
                        // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
      // StatusBar.backgroundColorByName("green");
      // StatusBar.backgroundColorByHexString("#333");
      // console.log('StatusBar:', StatusBar);
      // console.log('isInvisible:', StatusBar.isInvisible);
      // showStatusBar(false);
      // $cordovaStatusBar.hide();
      // StatusBar.hide();
      // $cordovaStatusBar.hide();
      // StatusBar.overlaysWebview(false);
    }


    // if (StatusBar.isVisible) {
    //   alert(StatusBar.isVisible)
    //   // alert(StatusBar)
    //   // StatusBar.backgroundColorByName("red");
    //   StatusBar.hide();
    //   StatusBar.overlaysWebview(false);
    //   // StatusBar.isVisible = false;
    // } else alert(StatusBar.isVisible);
    //
    // // if(ionic.Platform.isWebView()) {
    // //    $cordovaStatusbar.styleHex('#FF0000'); //Do what you want
    // //  }


  });
})

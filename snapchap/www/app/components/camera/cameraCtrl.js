angular.module('snapchat').controller('cameraCtrl', function ($scope, $stateParams, mainService) {

  mainService.showMenu();
  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').removeClass('chatty-nav profile-nav');



  // $cordovaStatusbar.overlaysWebView(true);
  //
  // // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
  // $cordovaStatusbar.style(1);
  //
  // // supported names: black, darkGray, lightGray, white, gray, red, green,
  // // blue, cyan, yellow, magenta, orange, purple, brown
  // $cordovaStatusbar.styleColor('black');
  //
  // $cordovaStatusbar.styleHex('#000');
  //
  // $cordovaStatusbar.hide();
  //
  // $cordovaStatusbar.show();
  //
  // var isVisible = $cordovaStatusbar.isVisible();

  // $ionicPlatform.ready(function() {
  //   ionic.Platform.fullScreen();
  //   if (window.StatusBar) {
  //     return StatusBar.hide();
  //   }
  // });

});

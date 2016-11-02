angular.module('snapchat').controller('cameraCtrl', function ($scope, $stateParams, mainService, $cordovaCamera, $rootScope, $state, $cordovaStatusbar) {


  mainService.showMenu();
  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').removeClass('chatty-nav profile-nav');

  $scope.goToChat = function() {
    $state.go('chat');
  }



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
  //   if (window.Statusbar) {
  //     return Statusbar.hide();
  //   }
  // });




//
//
//   document.addEventListener("deviceready", function(){
//
//
//   $scope.takePicture = function() {
//   var options = {
//     quality: 75,
//     destinationType: Camera.DestinationType.DATA_URL,
//     sourceType: Camera.PictureSourceType.CAMERA,
//     allowEdit: false,
//     encodingType: Camera.EncodingType.JPEG,
//     // targetWidth: 400,
//     // targetHeight: 500,
//     targetWidth: 640,
//     targetHeight: 1136,
//     // targetWidth: 1280,
//     // targetHeight: 2272,
//     popoverOptions: CameraPopoverOptions,
//     saveToPhotoAlbum: false,
//     correctOrientation: true
//   };
//
//   $cordovaCamera.getPicture(options).then(function(imageData) {
//     // var image = document.getElementById('myImage');
//     // image.src = "data:image/jpeg;base64," + imageData;
//     $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
//     $state.go('editMessage');
//   }, function(err) {
//     console.log(err);
//     // error
//   });
//
// };
//
// $cordovaStatusbar.hide();
// // $cordovaStatusbar.styleColor('black');
//
// // console.log('status bar:', $cordovaStatusbar);
//
//
// }, false);


});

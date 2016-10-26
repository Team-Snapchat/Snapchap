angular.module('snapchat').controller('mainCtrl', function ($scope, $stateParams, $state, $cordovaCamera, $rootScope, mainService) {




  document.addEventListener("deviceready", function() {

    $scope.takePicture = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      // targetWidth: 400,
      // targetHeight: 500,
      // targetWidth: 640,
      // targetHeight: 1136,
      // targetWidth: 1280,
      // targetHeight: 2272,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      // var image = document.getElementById('myImage');
      // image.src = "data:image/jpeg;base64," + imageData;
      $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
      $state.go('editMessage');
    }, function(err) {
      console.log(err);
      // error
    });

  };

  // $cordovaStatusbar.hide();
  // $cordovaStatusbar.styleColor('black');
  // console.log('status bar:', $cordovaStatusbar);




  }, false);

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    takePhoto fn only runs in the Camera view
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.takePhoto = function() {
    if ($state.current.name === 'camera') {
      $scope.takePicture();
      // $state.go('editMessage');
    }
  }

  $rootScope.accountInfo = []
  $rootScope.friends = []
  $rootScope.pendingMessages = []
  $rootScope.pendingFriendRequests = []

  var socket = io.connect();

    socket.on('getAccountInfo', function(accountInfo){
      $rootScope.accountInfo.push(accountInfo);
      $scope.$digest();
    })

    socket.on('getFriends', function(friends){
      $rootScope.friends.push(friends);
      $scope.$digest();
    })

    socket.on('getPendingMessages', function(pendingMessages){
      console.log(pendingMessages)
      $rootScope.pendingMessages.push(pendingMessages)
      $scope.$digest();
    })

    socket.on('getPendingFriendRequests', function(pendingFriendRequests){
      $rootScope.pendingFriendRequests.push(pendingFriendRequests)
      $scope.$digest();
    })







});

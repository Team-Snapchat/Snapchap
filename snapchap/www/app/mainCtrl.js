angular.module('snapchat').controller('mainCtrl', function ($scope, $stateParams, $state, $cordovaCamera, $rootScope, $auth, mainService, $ionicPopup) {




  document.addEventListener("deviceready", function() {

    $scope.takePicture = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      // targetWidth: 50,
      // targetHeight: 66,
      // targetWidth: 400,
      // targetHeight: 500,
      targetWidth: 320,
      targetHeight: 420,
      // targetWidth: 1280,
      // targetHeight: 2272,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: false
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
  if($rootScope.userInfo === undefined){
    $auth.logout()
        .then(function() {
          console.log('You have been logged out');
          $state.go('logIn')
    });
  }



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    SOCKETS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


  var heroku = "https://snapchap2.herokuapp.com"
  var local = "http://localhost:8100"
  var baseUrl = heroku;

  var socket;
  $rootScope.connect = function(){

      socket = io.connect(baseUrl);
      socket.emit('isLoggedin', {username: $rootScope.userInfo.username, id: $rootScope.userInfo.id})

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
    socket.on('notification', function(data){
      if(data.msgType === 'message') {
        $scope.showAlert = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'New Message!',
           subTitle: 'It might taste good'
         });

         alertPopup.then(function(res) {
            $state.go('chat');
         });
       };

     }
      if(data.msgType === 'request') {
        $scope.showAlert = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'You have a new friend request',
           template: 'It might taste good'
         });

         alertPopup.then(function(res) {
            $state.go('addedMe')
         });
       };
      }
      if(data.msgType === 'accepted') {
        $scope.showAlert = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'You\'re friend request was accepted',
           template: 'It might taste good'
         });
       };
      }
    })

  };

  $rootScope.disconnect = function(){
        if(socket) socket.disconnect()
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    END OF SOCKETS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


});

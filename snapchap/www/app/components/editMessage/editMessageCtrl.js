angular.module('snapchat').controller('editMessageCtrl', function ($scope, $stateParams, mainService, $rootScope, $cordovaKeyboard, $timeout, $state) {


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    HIDE/SHOW MENU
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  mainService.hideMenu();

  $scope.showMenu = function() {
    mainService.showMenu();
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    TOGGLE TEXT BAR
      Moves text bar into place when image is tapped
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.toggleTextBar = function() {
    var $textBar = $('#edit-message-view__input');

    if ($textBar.val().length > 0 && $textBar.is(':focus'))  {
      $textBar.trigger('blur');
      $textBar.css({'bottom': '0%', 'display': 'none'});
    }
    else if ($textBar.is(':focus')) {
      $textBar.css({'bottom': '0%', 'display': 'inline-block'});
    }
    else  {
      $textBar.css('bottom', '50%');
      $timeout(function() {
        $textBar.focus();
        $textBar.css({'bottom': '50%', 'display': 'inline-block'});
      }, 50);
    }
  }
  // Submit input value when Enter is clicked (not needed here)
  // $('#edit-message-view__input').on('keyup', function(e) {
  //   if (e.which == 13 && ! e.shiftKey) {
  //     $scope.toggleTextBar();
  //   }
  // });


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    TEXT OVERLAY
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // variables for starting image and canvas
  // var startImage = $rootScope.imgURI;
  var startImage = './img/rr.jpg';
  $scope.image = startImage;
  var canvas = document.getElementById('msgCanvas');
  var context = canvas.getContext('2d');

  // Overlay fn
  $scope.createOverlay= function() {
    // Always restart at base image, otherwise error (unsafe image)
    $scope.image = startImage;
    var textMsg = $('#edit-message-view__input').val();
    var source =  new Image();
    // $scope.textOverlay = textMsg;
    source.src = startImage;
    canvas.width = source.width;
    canvas.height = source.height;

    context.drawImage(source,0,0);

    context.textAlign = 'center';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.font = "100pt AvenirNextCondensed-Bold";

    if (textMsg.length > 42) {
      textMsg = textMsg.slice(0, 42);
    }
    // Check text length, chop if needed
    if (textMsg.length > 17) {
        textArray = textMsg.split(' ');
        var line1 = textArray[0] + ' ' + textArray[1] + ' ' + textArray[2] + ' ' + textArray[3];
        var line2 = '';
        textArray.forEach(function(curr, ind, attr) {
          ind > 3 ? line2 += (' ' + curr) : line2;
        })
        context.fillText(line1, canvas.width / 2, canvas.height * 0.8);
        context.strokeText(line1, canvas.width / 2, canvas.height * 0.8);
        context.fillText(line2, canvas.width / 2, canvas.height * 0.9);
        context.strokeText(line2, canvas.width / 2, canvas.height * 0.9);
    }
    else {
      context.fillText(textMsg, canvas.width / 2, canvas.height * 0.8);
      context.strokeText(textMsg, canvas.width / 2, canvas.height * 0.8);
    }
    // context.fillText($scope.textOverlay, canvas.width / 2, canvas.height * 0.8);
    // context.strokeText($scope.textOverlay, canvas.width / 2, canvas.height * 0.8);
    var textAndImgURI = canvas.toDataURL();


    $timeout( function() {
        $scope.image = textAndImgURI;
        $rootScope.imgURI = textAndImgURI;
        $state.go('sendTo');
    }, 200);
  }



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  SAVE PHOTO (not working)
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    // alert("Got deviceready");
    var canvas2ImagePlugin = window.plugins.canvas2ImagePlugin;
  }

  $scope.saveImage2Device = function() {
    window.canvas2ImagePlugin.saveImageDataToLibrary(
      function(msg) {
        console.log(msg);
      },
      function(err) {
        console.log(err);
      },
      document.getElementById('msgCanvas')
    );
  };





});

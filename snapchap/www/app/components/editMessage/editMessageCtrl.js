angular.module('snapchat').controller('editMessageCtrl', function ($scope, $stateParams, mainService, $rootScope, $cordovaKeyboard, $timeout, $state) {


 /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
   HIDE/SHOW MAIN MENU
 /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  $scope.load = function() {
    mainService.hideMenu();
  }
  $scope.showMenu = function() {
    mainService.showMenu();
  }

  // Brings in the photo saved onto $rootScope by camera
  $rootScope.imgURI = './img/rr2.jpg';
  $scope.snap = $rootScope.imgURI;


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    CANVAS
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  // This is the drawing area
  var canvas = document.getElementById('canvas');

  // Scaling variables that will scale canvas different for drawing vs. text
  var scaleUp, scaleDown;

  // Sets the image stored in $scope as the base image for the picture message
  function makeBase() {
    var baseImg = new Image();
    baseImg.src = $scope.snap;
    baseImg.onload = function() {
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;
      var canvasContainerWidth = $('.canvas-container').width();
      scaleUp = baseImg.width / canvasContainerWidth; // This is the scale of the full-size image to the viewed image
      scaleDown = canvasContainerWidth / baseImg.width; // This is the scale of the viewed image to the full-size image
      context.drawImage(baseImg, 0, 0); // Puts the base image in the context
      context.scale(scaleUp, scaleUp); // Scales drawing area up to cover the full-sized image
    }
  }
  makeBase()


  $scope.clearDrawing = function() {
    console.log(text);
    signaturePad.clear(); // Clears canvas
    makeBase(); // Remakes the base image from $scope
    $timeout(function() {
      $scope.overlayText();  // Replaces previous text overlay
    }, 50);
  };
  $scope.clearCanvas = function() {
    makeBase();
  };
  $scope.saveCanvas = function() {
    $scope.snap = signaturePad.toDataURL();
  };


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    DRAWING PAD
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  // Pencil button that will toggle the color picker
  var penButton = $('#edit-message-view__pen-btn');
  var defaultColor = 'black';
  var selectedColor = defaultColor;

  // The assigned variable grants access to SignaturePad methods
  var signaturePad = new SignaturePad(canvas, {
    minWidth: 2,
    maxWidth: 3,
    // dotSize: 3,
    penColor: 'rgba(0, 0, 0, 0)'
  });

  var context = canvas.getContext('2d');

  $scope.togglePenSize = function() {
    if (signaturePad.maxWidth === 3) {
      signaturePad.minWidth = 7;
      signaturePad.maxWidth = 10;
      $('#edit-message-view__pen-size-btn').addClass('big-pen');
    } else {
      signaturePad.minWidth = 2;
      signaturePad.maxWidth = 3;
      $('#edit-message-view__pen-size-btn').removeClass('big-pen');
    }
  };


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    COLOR PICKER
      Clicking a color on the picker sets the pen color
      $scope.toggleColorPicker:
        - toggles visibility property on color picker
        - toggles background color of pen icon
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $('.color').on('click', function() {
    // var pixelData = $('#color-picker').getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
    // The line above allows color selection of elements that are part of the canvas context
    selectedColor = $(this).css('background-color');
    console.log(selectedColor);
    signaturePad.penColor = selectedColor;
    penButton.css('background-color', selectedColor);
  });

  $scope.toggleColorPicker = function() {
    if ($('#edit-message-view__input').hasClass('active')) {
      return;
    }
    else {
      $('#color-picker').toggleClass('active');
      $('#edit-message-view__undo-btn').toggleClass('active');
      $('#edit-message-view__pen-size-btn').toggleClass('active');
      penButton.toggleClass('active');
      if (penButton.hasClass('active')) {
        signaturePad.penColor = selectedColor;
        penButton.css('background-color', signaturePad.penColor);
      } else {
        signaturePad.penColor = 'rgba(0, 0, 0, 0)';
        penButton.css('background-color', 'transparent');
      }
    }

  };



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    TEXT BAR
      Submits input value when Enter is clicked
      $scope.toggleTextBar:
        - moves text bar into place when image is tapped
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  var $textBar = $('#edit-message-view__input');
  var text = '';

  $textBar.on('keyup', function(e) {
    if (e.which == 13 && ! e.shiftKey) {
      $textBar.css({'visibility': 'hidden'});
      $textBar.removeClass('active');
      $textBar.blur();
    }
  });

  $scope.toggleTextBar = function() {
    $textBar.css('visibility', 'visible');
    if ($('#color-picker').hasClass('active')) {
      return;
    } else if ($textBar.hasClass('active')) {
      $textBar.removeClass('active');
      $timeout(function() {
        $textBar.trigger('blur');
      }, 200);
    } else {
      $textBar.addClass('active');
      $timeout(function() {
        $textBar.trigger('focus');
      }, 200);
    }
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
   TEXT OVERLAY
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.overlayText = function() {
    context.scale(scaleDown, scaleDown); // Scale context down to 1:1 before overlaying text
    context.textAlign = 'center';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    var fontSize = canvas.width / 12; // Font size based on canvas width
    context.font = fontSize + "pt AvenirNextCondensed-Bold";
    context.lineHeight = fontSize * 1.35; // Line height based on font size
    context.lineWidth = fontSize / 7; // Stroke width on text

    text = $textBar.val();
    var widthOfText = context.measureText(text).width; // Width of text in pixels
    var numLines = Math.ceil(widthOfText / canvas.width); // Number of lines of text
    var xPosition = canvas.width / 2; // Centers text on screen (horizontally)
    var yPosition = canvas.height - (context.lineHeight * (numLines + 0.5)); // Placement on y-axis near bottom, based on lines of text


    function wrapText(context, text, x, y, maxWidth, lineHeight) { // function for wrapping multiple lines of text
      var words = text.split(' ');
      var line = '';

      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.strokeText(line, x, y); // Stroke first, then fill on top (so stroke doesn't cover inner fill)
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      context.strokeText(line, x, y); // Stroke first, then fill on top (so stroke doesn't cover inner fill)
      context.fillText(line, x, y);
    }
    wrapText(context, text, xPosition, yPosition, canvas.width, context.lineHeight)

    // var textAndImgURI = canvas.toDataURL();
    // $scope.snap = textAndImgURI;

    context.scale(scaleUp, scaleUp); // Scale context back up on exiting fn (so drawing covers image again)
 }



 /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
   SAVE IMAGE
 /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    $scope.saveImage = function() {
      $rootScope.imgURI = canvas.toDataURL();
      // console.log('$rootScope.imgURI', $rootScope.imgURI);
      $state.go('sendTo');
    };


});









   // $scope.noScroll = function() {
   //   alert('yay');
   //   var drawCanvas = document.getElementById('draw-canvas');
   //     drawCanvas.onscroll = function() {
   //       drawCanvas.scrollLeft = 0;
   //     };
   // }

   // $('#draw-canvas').on('mousedown', function() {
   //   alert('yay')
   //   $('#draw-canvas').scrollLeft(0);
   // })






   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
     SAVE PHOTO (not working)
   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
     // document.addEventListener("deviceready", onDeviceReady, false);
     //
     // function onDeviceReady() {
     //   // alert("Got deviceready");
     //   var canvas2ImagePlugin = window.plugins.canvas2ImagePlugin;
     // }
     //
     // $scope.saveImage2Device = function() {
     //   window.canvas2ImagePlugin.saveImageDataToLibrary(
     //     function(msg) {
     //       console.log(msg);
     //     },
     //     function(err) {
     //       console.log(err);
     //     },
     //     document.getElementById('msg-canvasvas')
     //   );
     // };
     //
     //

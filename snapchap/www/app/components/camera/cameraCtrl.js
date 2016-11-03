angular.module('snapchat').controller('cameraCtrl', function ($scope, $stateParams, mainService, $cordovaCamera, $rootScope, $state, $cordovaStatusbar, $cordovaFileTransfer) {


  mainService.showMenu();
  $('#index-html__chat-btn, #index-html__take-photo-btn, #index-html__dots-btn').removeClass('chatty-nav profile-nav');

  $scope.goToView = function(view) {
    $state.go(view);
  };






  //////////Uploading to S3 with cordova File Tranfer//////////////////
   //Step 1
   //store your AWS S3 bucket name, secret, and AWS key in your server, when you want to upload an image
   //from the ionic app. it sends a request to your server endpoint, signs it with your AWS credentials
   //returning policy, signature and, AWS key.
   function uploadToS3(imageURI) {
     var signingURI = API_URL + "s3signing";
     var fileName =  $scope.item.vendorId + new Date().getTime() + ".jpg"; //src("../img/rr.jpg")
     $scope.item.picture = 'https://s3-eu-west-2.amazonaws.com/snapchap-dev/' + fileName;
     console.log('Uploading ' + fileName + ' to S3');

     $http.post(signingURI, {
       "fileName": fileName
     }).success(function(data, status, headers, config) {
       console.log('Got signed doc: ' + JSON.stringify(data));
     var Uoptions = {};
     Uoptions.fileKey = "file";
     Uoptions.fileName = fileName;
     Uoptions.mimeType = "image/jpeg";
     Uoptions.chunkedMode = false;
     Uoptions.headers = {
       connection: "close"
     };
     Uoptions.params = {
       "key": fileName,
       "AWSAccessKeyId": data.awsKey,
       "acl": "private",
       "policy": data.policy,
       "signature": data.signature,
       "Content-Type": "image/jpeg"
     };
     ////Step 2
     ///use the camera plugin to take a photo or select photo from gallery:
     $scope.selectPicture = function() {

        document.addEventListener('deviceready', function() {

            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
            };
            $cordovaCamera.getPicture(options).then(function(imageURI) {
                $scope.imageSrc = imageURI;
                $scope.img = imageURI;

            }, function(err) {
                alert(err);
            });

        }, false); // device ready
    }; // Select picture
    ///Step 3
    ///upload the image or file to the AWS s3 using the File Transfer plugin:

    $cordovaFileTransfer.upload("https://" + data.bucket + ".s3.amazonaws.com/", imageURI, Uoptions)
         .then(function(result) {
             // Success!
             // Let the user know the upload is completed
             console.log('upload to s3 succeed ', result);

         }, function(err) {
             // Error
             // Uh oh!
             $ionicLoading.show({template : 'Upload Failed', duration: 3000});
             console.log('upload to s3 fail ', err);
         }, function(progress) {

             // constant progress updates
         });

       })
     .error(function(data, status, headers, config) {

         console.log(' didnt Got signed doc: ' + JSON.stringify(data));
     });
   } // upload to Amazon s3 bucket

   //////////// Retrieve images from AWS ////////////

   // Tells angular the url where our images are stored
   $scope.s3Url = 'https://s3-us-west-2.amazonaws.com/snapchap-dev/';

   var awsConfig = require('../AWS.config.js');
   // Updating the AWS config file with the proper credentials so we can access the bucket
   AWS.config.update({
     accessKeyId: awsConfig.aws_access_key_id ,
     secretAccessKey: awsConfig.aws_secret_access_key
   });
   AWS.config.region = "us-west-2";

   //assigning the bucket to access to a variable to be able to access it more readily
   var bucket = new AWS.S3({
     params: {
       Bucket: 'snapchap-dev'
     }
   });

   // pull the list of files in the bucket

   bucket.listObjects(function (err, data) {
     if (err) {
       console.log(err);
     }
     else {
       console.log(data);
       $scope.allImageData = data.Contents;
     }
   });
   // load an image and converts it to base 64
   bucket.getObject({Key: '.jpg'},function(err,file){
     $timeout(function(){
       $scope.s3url = "data:image/jpeg;base64," + encode(file.Body);
     },1);
   });
   function encode(data) {
     var str = data.reduce(function(a,b){
       return a+String.fromCharCode(b);
     },'');
     return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
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

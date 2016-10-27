angular.module('snapchat').controller('sendToCtrl', function ($scope, $stateParams, $state, mainService, $rootScope) {


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Ticking a checkmark makes the Send Bar appear
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    $scope.showSendBar = function() {
      $('.blue-checkbox').each(function() {
        if ($(this).is(':checked')) {
          fontWeight = 'bold';
          bgColor = 'rgba(230, 230, 230, 0.7)'
        }
        else {
          fontWeight = 'normal';
          bgColor = 'inherit';
        }
        $(this).closest('label').css('font-weight', fontWeight);
        $(this).closest('li').css('background-color', bgColor);
      });

      // var fontWeight = $(this).is(':checked') ? 'bold' : 'normal';
      // $(this).closest('label').css('font-weight', fontWeight);
      // $(this).closest('li').css('background-color', 'lightgray');

      var friendsChecked = $('.blue-checkbox').is(':checked') ? true : false;
      if (friendsChecked) {
        $('#send-to-view__send-bar').addClass('bar-is-visible');
      } else $('#send-to-view__send-bar').removeClass('bar-is-visible');
    };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Clicking a friend puts selected friends into an array (and displays in Send Bar)
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.selectRecipients = function() {
    var recipients = [];
    $('.blue-checkbox').each(function() {
      if ($(this).is(':checked')) {
        recipients.push($(this).closest('li').find('.friend-name').html());
      }
    });
    $scope.recipients = recipients;
  }




  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Send Button
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.send = function() {
    console.log('sendTo view: recipients:', $scope.recipients);
    console.log('sendTo view: $rootScope.URI:', $rootScope.imgURI);
    // mainService.sendPictureMsg($scope.recipients, $rootScope.imgURI);
  }

  // MAINSERVICE FUNCTION
  // this.sendPictureMsg = function(recipients, picMsg) {
  //     recipients.forEach(function(curr, ind, a) {
  //       return $http.post('/api/uploadPictureMsg').then(function(confirmation){
  //         return confirmation;
  //       })
  //     })
  // }


  // SERVER ENDPOINT
  // app.post('/api/uploadPictureMsg', controller.uploadPictureMsg);


  // SERVERCONTROL FUNCTION
  // uploadPictureMsg: function(req, res){
  //   db.upload_picture_msg([req.body.senderId, req.body.recipientId, req.body.pictureMsg], function(err, pending_messages){
  //      if(err) console.log(err);
  //      else {
  //        io.emit('getPendingMessages',{test: '.io working!!!'});
  //        res.status(200).send('return through .then')
  //      }
  //    })
  // },






  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Hard-coded arrays for testing
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // $scope.besties = ['Brian', 'James', 'Abbie', 'Lucy', 'Morty']
  $scope.besties = ['Brian', 'Fred', 'Arthur', 'Jo', 'Molly', 'James', 'Abbie', 'Lucy', 'Morty', 'Bucky', 'George', 'Charlie', 'Nicholas', 'Ricky', 'Kathleen', 'Lee', 'Mal']

});

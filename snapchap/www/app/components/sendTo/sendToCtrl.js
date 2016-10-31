angular.module('snapchat').controller('sendToCtrl', function ($scope, $stateParams, $state, mainService, $rootScope) {


  $scope.getUserFriends = function(userId) {
    mainService.getUserFriends(userId).then(function(response) {
      // console.log('response', response);
      $scope.friends = response;
    })
  }
  $scope.getUserFriends($rootScope.userInfo.id);



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
  var recipients = [];

  $scope.selectRecipients = function(recipientId) {
      if (recipients.indexOf(recipientId) === -1) {
        recipients.push(recipientId);
      } else recipients.splice(recipients.indexOf(recipientId), 1);

    setTimeout(function() {
        // console.log($(window).width() - $('#recipient-list').width());
      if ($(window).width() - $('#recipient-list').width() < 65) {
        $('#recipient-list').css('right', '65px');
      } else $('#recipient-list').css('right', 'auto');
    }, 10);

    $scope.recipients = recipients;
    console.log(recipients);

  }

  // $('.blue-checkbox').each(function() {
  // recipients.push($(this).closest('li').find('.friend-name').html());
  // });



  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    Send Button
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.send = function() {
    console.log('sendTo view: recipients:', $scope.recipients);
    // console.log('sendTo view: $rootScope.URI:', $rootScope.imgURI);
    console.log('sendTo view: $rootScope.URI:', $rootScope.userInfo.id);
    mainService.sendMessage($rootScope.userInfo.id, $scope.recipients, $rootScope.imgURI);
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

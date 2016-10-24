angular.module('snapchat').controller('mainCtrl', function ($scope, $stateParams, $state) {

  $scope.takePhoto = function() {
    $state.current.name === 'camera' ? console.log('PHOTO!') : 0;
  }

});

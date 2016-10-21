angular.module('snapchat')

// .factory('BlankFactory', [function(){
//
// }])

.service('service', function($http) {

  this.getUserFriends = function(id) {
    return $http({
      method: 'GET',
      url: '/user/friends/' + id
    }).then(function(response) {
      return response.data;
    })
  }


});

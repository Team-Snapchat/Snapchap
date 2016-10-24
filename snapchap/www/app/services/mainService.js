angular.module('snapchat')
// .factory('BlankFactory', [function(){
//
// }])
.service('mainService', function($http) {


  this.getUserFriends = function(id) {
    return $http({
      method: 'GET',
      url: '/user/friends/' + id
    }).then(function(response) {
      return response.data;
    })
  }

  this.showMenu = function() {
    document.getElementById('index-html__nav-bottom').style.display = 'flex';
  };
  this.hideMenu = function() {
    document.getElementById('index-html__nav-bottom').style.display = 'none';
  };

  // this.showMenu = function() {
  //   document.getElementById('index-html__nav-bottom').style.visibility = 'visible';
  // };
  // this.hideMenu = function() {
  //   document.getElementById('index-html__nav-bottom').style.visibility = 'hidden';
  // };



});

angular.module('snapchat')
.service('mainService', function($http) {

  var heroku = "https://snapchap2.herokuapp.com"
  var local = "http://localhost:8100"
  var baseUrl = heroku;
  // var baseUrl = heroku;

  this.getUserFriends = function(id) {
    return $http({
      method: 'GET',
      url: baseUrl + '/user/friends/' + id
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


  this.getCurrentUser = function(){
    return $http.get(baseUrl + '/api/me').then(function(response){
        return getCurrentUserInfo(response.data)
    })
  }
  var getCurrentUserInfo = function(userId){
    return $http.get(baseUrl + '/api/me/'+ userId).then(function(response){
      currentUser = '';
      return response.data[0];
    })
  }


  this.updateFriends = function(){
      return $http.get(baseUrl + '/user/friends/:id').then(function(friends){
        return 'friends';
      })
  }

  this.getPendingMessageIds = function(id){
    return $http.get(baseUrl + '/api/getPendingMessageIds/' + id).then(function(pendingMessageIds){
        return pendingMessageIds;
    })
  }
  this.getMessage = function(id){
    return $http.get(baseUrl + '/api/getMessage/' + id).then(function(messages){
        return messages;
    })
  }
  this.deleteMessage = function(id) {
    return $http.delete(baseUrl + '/api/deleteMessage/' + id).then(function(confirmation) {
      return confirmation;
    });
  }
  this.getPendingFriendRequests = function(id){
      return $http.get(baseUrl + '/api/getPendingFriendRequests/'+ id).then(function(PendingFriendRequests){
        console.log("mainSERVICE",PendingFriendRequests)
        return PendingFriendRequests;
      })
  }

  this.replyToFriendRequest = function(data){
      return $http.put(baseUrl + '/api/changeFriendship', {data: data}).then(function(confirmation){
        return confirmation;
      })
  }

  this.sendMessage = function(sender, receiver, msg) {
      if (Array.isArray(receiver)) {
        receiver.forEach(function(item) {
          return $http.post(baseUrl + '/api/uploadMessage',{senderId:sender, recipientId:item, msg: msg}).then(function(confirmation) {
            return confirmation;
          })
        });
      }
  }
  this.getUsername = function(inputText, id){
    return $http.post(baseUrl + '/api/searchUsers', {query: inputText, id: id}).then(function(results){
        return results;
    })
  }

  this.sendFriendRequest = function(data){
      return $http.post(baseUrl + '/api/sendRequest', {data: data}).then(function(flag){
        return flag;
      })
  }

  this.deleteFriend = function(){
      return $http.delete(baseUrl + '/api/deleteFriendship').then(function(confirmation){
        return 'confirmation';
      })
  }

  this.updateEmail = function(data){
    return $http.put(baseUrl + '/api/updateEmail', {id: data.id, email: data.email}).then(function(confirmation){
      return confirmation;
    })
  }

  this.comparePassword = function(id, password){
    return $http.put(baseUrl + '/api/comparePassword', {id: id, password: password}).then(function(confirmation){
      return confirmation;
    })
  }

  this.updateFirstName = function(id, firstName){
    return $http.put(baseUrl + '/api/updateFirstName', {id: id, firstName: firstName}).then(function(confirmation){
      return confirmation;
    })
  }

  this.updateLastName = function(id, lastName){
    return $http.put(baseUrl + '/api/updateLastName', {id: id, lastName: lastName}).then(function(confirmation){
      return confirmation;
    })
  }

  this.updatePassword = function(id, password){
    return $http.put(baseUrl + '/api/updatePassword', {id: id, password: password}).then(function(confirmation){
      return confirmation
    })
  }









});

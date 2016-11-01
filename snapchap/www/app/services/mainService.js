angular.module('snapchat')
.service('mainService', function($http) {

// THIS IS A TEST


  this.getUserFriends = function(id) {
    return $http({
      method: 'GET',
      url: 'https://snapchap.herokuapp.com/user/friends/' + id
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
    return $http.get('https://snapchap.herokuapp.com/api/me').then(function(response){
        return getCurrentUserInfo(response.data)
    })
  }
  var getCurrentUserInfo = function(userId){
    return $http.get('https://snapchap.herokuapp.com/api/me/'+ userId).then(function(response){
      currentUser = '';
      return response.data[0];
    })
  }


  this.updateFriends = function(){
      return $http.get('https://snapchap.herokuapp.com/user/friends/:id').then(function(friends){
        return 'friends';
      })
  }

  this.getPendingMessageIds = function(id){
    return $http.get('https://snapchap.herokuapp.com/api/getPendingMessageIds/' + id).then(function(pendingMessageIds){
        return pendingMessageIds;
    })
  }
  this.getMessage = function(id){
    return $http.get('https://snapchap.herokuapp.com/api/getMessage/' + id).then(function(messages){
        return messages;
    })
  }
  this.deleteMessage = function(id) {
    return $http.delete('https://snapchap.herokuapp.com/api/deleteMessage/' + id).then(function(confirmation) {
      return confirmation;
    });
  }
  this.getPendingFriendRequests = function(id){
      return $http.get('https://snapchap.herokuapp.com/api/getPendingFriendRequests/'+ id).then(function(PendingFriendRequests){
        console.log("mainSERVICE",PendingFriendRequests)
        return PendingFriendRequests;
      })
  }

  this.replyToFriendRequest = function(data){
      return $http.put('https://snapchap.herokuapp.com/api/changeFriendship', {data: data}).then(function(confirmation){
        return confirmation;
      })
  }

  this.sendMessage = function(sender, receiver, msg) {
      if (Array.isArray(receiver)) {
        receiver.forEach(function(item) {
          return $http.post('https://snapchap.herokuapp.com/api/uploadMessage',{senderId:sender, recipientId:item, msg: msg}).then(function(confirmation) {
            return confirmation;
          })
        });
      }
  }
  this.getUsername = function(inputText){
    return $http.post('https://snapchap.herokuapp.com/api/searchUsers', {data: inputText}).then(function(results){
        return results;
    })
  }

  this.sendFriendRequest = function(data){
      return $http.post('https://snapchap.herokuapp.com/api/sendRequest', {data: data}).then(function(flag){
        return flag;
      })
  }

  this.deleteFriend = function(){
      return $http.delete('https://snapchap.herokuapp.com/api/deleteFriendship').then(function(confirmation){
        return 'confirmation';
      })
  }

  this.updateEmail = function(data){
    return $http.put('https://snapchap.herokuapp.com/api/updateEmail', {id: data.id, email: data.email}).then(function(confirmation){
      return confirmation;
    })
  }

  this.comparePassword = function(password, id){
    return $http.put('https://snapchap.herokuapp.com/api/comparePassword', {password: password, id: id}).then(function(confirmation){
      return confirmation;
    })
  }

  this.updateFirstName = function(id, firstName){
    return $http.put('https://snapchap.herokuapp.com/api/updateFirstName', {id: id, firstName: firstName}).then(function(confirmation){
      return confirmation;
    })
  }

  this.updateLastName = function(id, lastName){
    return $http.put('https://snapchap.herokuapp.com/api/updateLastName', {id: id, lastName: lastName}).then(function(confirmation){
      return confirmation;
    })
  }

  this.updatePassword = function(id, password){
    return $http.put('https://snapchap.herokuapp.com/api/updatePassword', {id: id, password: password}).then(function(confirmation){
      return confirmation
    })
  }









});

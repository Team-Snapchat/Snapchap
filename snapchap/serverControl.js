var app = require('./server.js');
var db = app.get('db');


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  EXPORTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
module.exports = {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
      Get all users (admin)
      Get this user
      Update user
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  getUserFriends: function(req, res) {
    db.get_user_friends([req.params.id], function(err, friends) {
      if(err) console.log(err);
      else res.status(200).json(friends);
    });
  },

 uploadMessage: function(req, res){
   db.upload_message([req.body.senderId, req.body.recipientId, req.body.message], function(err, pending_messages){
      if(err) console.log(err);
      else res.status(200)
    })
 },

 getMessages: function(req, res){
   db.get_messages([req.params.id], function(err, pending_messages){
      if(err) console.log(err);
      else res.status(200).send(pending_messages)
    })
  },

  sendRequest: function(req, res) {
    db.send_request([req.params.initiatorId, req.params.acceptorId], function(err, friendships){
      if(err) console.log(err);
      else res.status(200);
    })
  },

  acceptFriendship: function(req, res){
    db.accept_friendship([req.params.friendshipId], function(err, friendships){
      if(err) console.log(err);
      else res.status(200);
    })
  },

  deleteFriendship: function(req, res){
    db.delete_friendship([req.params.friendshipId], function(err, friendships){
      if(err) console.log(err);
      else res.status(200);
    })
  }





};

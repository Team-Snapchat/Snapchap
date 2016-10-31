var server = require('./server.js');
var moment = require('moment');
var jwt = require('jwt-simple');
var app = server.app;
var io = server.io;
var config = server.config;
var db = app.get('db');



var whosLoggedIn = {}

io.on('connection', function(socket){
  socket.on('isLoggedin', function(data){
    whosLoggedIn[data.id] = socket;
    console.log(data.username + ' connected on ' + socket.id)
  })
// socket.on('startDisconnect', function(data){
//     delete whosLoggedIn[data.id]
//     console.log(whosLoggedIn)
//     console.log(data.username + ' disconnect from ' + socket.id)
//     socket.emit('confirmDisconnect', {disconnected: data.username + 'disconnected from socket'})
// })

  socket.on('disconnect', function(data){
    for (var key in whosLoggedIn) {
      if(whosLoggedIn[key] === socket.id){
        console.log(whosLoggedIn[key], "removed")
        delete whosLoggedIn[key];

      }
    }
})

})

createJWT = function(user){
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

getSafeUser = function(user){
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name
  }
}



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
  ensureAuthenticated: function(req, res, next){
    if (!req.header('Authorization')) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
      payload = jwt.decode(token, config.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
  },


  logIn: function(req, res) {
    db.users.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500)
      if (!user) {
        return res.status(401).send({
          message: "We can't find an account with that username."
        })
      }
    db.compare_password([req.body.password, user.id], function(err, correct){
      if(err) console.log(err);
      if(correct[0]['?column?']){
        res.send({
          token: createJWT(user),
          user: getSafeUser(user)
        })
      }
      else res.status(401).send({
        message: "That's not the right password. Sorry!"
      })
    })

    });
  },

  signUp: function(req, res) {
    db.users.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken' });
      }
      else {
        db.create_user([req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email], function(err, users){
          db.users.findOne({email: req.body.email}, function(err, user){
            console.log('sign-up is working');
            res.send({
              token: createJWT(user),
              user: getSafeUser(user)
            });
          })
        })
      }
    });
  },

  getCurrentUser: function(req, res){
    if(!req.user){
      return res.status(404)
    }
    else{
      var user = req.user
      res.json(user)
    }
  },
  getCurrentUserInfo: function(req, res){
    db.get_user_info([req.params.id], function(err, users){
      if(err) console.log(err)
      else res.status(200).send(users)
    })
  },
  searchUsers: function(req, res){
    db.search_users([req.body.data], function(err, results){
    res.send(results);
    })
  },
  getUserFriends: function(req, res) {
    db.get_user_friends([req.params.id], function(err, friends) {
      if(err) console.log(err);
      else res.status(200).json(friends);
    });
  },

  comparePassword: function(req, res) {
    db.compare_password([req.body.password, req.body.id], function(err, correct){
      if(err) console.log(err);
      if(correct[0]['?column?']){
        res.status(200).send(true)
      }
      else res.status(401).send({
        message: "That's not the right password. Sorry!"
      })
    });
  },

  updateEmail: function(req, res) {
        db.update_email([req.body.id, req.body.email], function(err, users) {
          if(err) console.log(err);
          else res.status(200).send(users);
        });
  },

  updateFirstName: function(req, res) {
    db.update_first_name([req.body.id, req.body.firstName], function(err, users) {
      if(err) console.log(err);
      else res.status(200).send(true);
    });
  },

  updateLastName: function(req, res) {
    db.update_last_name([req.body.id, req.body.lastName], function(err, users) {
      if(err) console.log(err);
      else res.status(200).send(true);
    });
  },

  updatePassword: function(req, res) {
    db.update_password([req.body.id, req.body.password], function(err, users) {
      if(err) console.log(err);
      else res.status(200).send(true);
    });
  },

 uploadMessage: function(req, res){
   db.upload_message([req.body.senderId, req.body.recipientId, req.body.msg], function(err, id){
     if(err) console.log(err);
     else {
       if (whosLoggedIn[req.body.recipientId]) whoseLoggedIn[req.body.recipientId].emit('newMessage',{msg: id[0].id, senderId:req.body.senderId});
       res.status(200).send('message sent!')
      }
    })
 },

 getMessage: function(req, res){
   db.get_message([req.params.id], function(err, pending_messages){
      if(err) console.log(err);

      else {
        res.status(200).send(pending_messages)
      }
    })
  },
  deleteMessage: function(req, res) {
    db.delete_message([req.params.id], function(err, pending_messages) {
      if(err) console.log(err);
      else res.status(200).send('deleted! :-)')
    })
  },
  getPendingMessageIds: function(req, res){
    db.get_message_ids([req.params.id], function(err, pending_messages){
       if(err) console.log(err);

       else {
         res.status(200).send(pending_messages)
       }
     })
   },
  getPendingFriendRequests: function(req, res){
    db.get_pending_friend_requests([req.params.id], function(err, PendingFriendRequests){
      if (err) console.log(err);
      else res.status(200).send(PendingFriendRequests)
    })
  },

  sendRequest: function(req, res) {
    db.send_request([req.body.data.initiatorId, req.body.data.acceptorId], function(err, friendships){
      if(err) console.log(err);
      else res.status(200).send(true);
    })
  },

  updateRequests: function(req, res) {
    db.update_requests([req.params.id], function(err, friendships) {
      if(err) console.log(err);
      else res.status(200).send(friendships);
    });
  },

  acceptFriendship: function(req, res){
    db.accept_friendship([req.body.data.initiatorId, req.body.data.acceptorId], function(err, response){

      if(err) console.log(err);
      else res.status(200).send(true);
    })
  },

  deleteFriendship: function(req, res){
    db.delete_friendship([req.params.friendshipId], function(err, friendships){
      if(err) console.log(err);
      else res.status(200);
    })
  }





};

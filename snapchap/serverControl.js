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
    console.log('getUserFriends fired');
    console.log('req.params.id before', req.params.id);
    db.get_user_friends([req.params.id], function(err, friends) {
      console.log('req.params.id after', req.params.id);
      res.status(200).json(friends);
    });
  },

  // addUserFriend: function(req, res) {
  //   db.add_user_friend([req.params.id, req.params.friend], function(err, friend) {
  //     res.status(200).json(friend);
  //   });
  // },
  //
  // unfriendUserFriend: function(req, res) {
  //   db.unfriend_user_friend([req.params.id1, req.params.id2], function(err, friends) {
  //     res.status(200).send(friends);
  //   });
  // },

  // getUsers: function(req, res) {
  //   db.get_users(function(err, users) {
  //     res.status(200).json(users);
  //   });
  // },
  // getThisUser: function(req, res) {
  //   console.log('req.user', req.user);
  //   db.get_this_user([req.params.id], function(err, user) {
  //     res.status(200).json(user);
  //   });
  // },
  // postUser: function(req, res) {
  //   db.post_user([req.body.firstname, req.body.lastname, req.body.address, req.body.zip, req.body.username, req.body.password], function(err, user) {
  //     res.status(200).json(user);
  //   });
  // },
  // updateUserInfo: function(req, res) {
  //   db.update_user_info([req.body.firstname, req.body.lastname, req.body.username, req.body.address, req.body.zip, req.body.id], function(err, user) {
  //     res.status(200).json(user);
  //   });
  // },
  // updatePassword: function(req, res) {
  //   console.log(req.body.newPassword);
  //   console.log(req.body.id);
  //   db.update_password([req.body.newPassword, req.body.id], function(err, user) {
  //     res.status(200).json(user);
  //   });
  // },



};

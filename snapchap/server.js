/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  REQUIREMENTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
// var cors = require('cors');
var config = require('./config.js');
// var corsOptions = {
//   origin: 'http://localhost:7000'
// };
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var pg = require('pg');

// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if(err) throw err;
//   console.log('Connected to Postgres! Getting schemas…');
//
//   client
//   .query('SELECT table_schema, table_name FROM information_schema.tables;')
//   .on('row', function(row) {
//     console.log(JSON.stringify(row));
//   });
// })

// AMAZON S3 ADDED

var AWS = require("aws-sdk");
AWS.config = new AWS.Config();
AWS.config.accessKeyId = config.aws_access_key_id;
AWS.config.secretAccessKey = config.aws_secret_access_key;

/////////////////////////////////////////////////////////

var db = massive.connectSync({
  // connectionString: 'postgres://lfplrggqqyouri:q3Gm_eM4QynflveLkI0mVNQ8Yu@ec2-54-235-180-14.compute-1.amazonaws.com:5432/dc0m2p77oia9at'
  // DATABASE_URL=$(heroku config:get DATABASE_URL -a snapchap) your_process
  connectionString: process.env.DATABASE_URL
  // connectionString: config.connectionString
  // connectionString: 'postgres://postgres@localhost:5432/snap'
});

app.set('db', db);

module.exports = {app: app, io: io, config: config};

// AMAZON S3 ADDED


  var s3 = new AWS.S3();

 s3.createBucket({Bucket: 'snapchap-dev'}, function() {

  var params = {Bucket: 'snapchap-dev', Key: config.aws_access_key_id, Body: 'Hello!'};

  s3.putObject(params, function(err, data) {

      if (err)

          console.log(err);

      else       console.log("Successfully uploaded data to myBucket/myKey");

   });

});

////////////////////////////////////////////////////////



var controller = require('./serverControl.js');
app.use(bodyParser.json({limit: '100mb'}));
app.use(cors());
// app.use(cors(corsOptions));

// app.use(express.static('../www'));


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  ENDPOINTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.get('/api/me', controller.ensureAuthenticated, controller.getCurrentUser)
app.get('/api/me/:id', controller.ensureAuthenticated, controller.getCurrentUserInfo)
app.get('/user/friends/:id', controller.getUserFriends);
app.get('/api/getMessage/:id', controller.getMessage);
app.get('/api/getPendingMessageIds/:id', controller.getPendingMessageIds);
app.get('/api/getPendingFriendRequests/:id', controller.getPendingFriendRequests);
app.put('/api/changeFriendship', controller.acceptFriendship);
app.put('/api/updateRequests', controller.updateRequests);
app.put('/api/updateEmail', controller.updateEmail);
app.put('/api/updatePassword', controller.updatePassword);
app.put('/api/comparePassword', controller.comparePassword);
app.put('/api/updateFirstName', controller.updateFirstName);
app.put('/api/updateLastName', controller.updateLastName);
app.post('/api/searchUsers', controller.searchUsers);
app.post('/api/uploadMessage', controller.uploadMessage);
app.post('/api/sendRequest', controller.sendRequest);
app.post('/auth/login', controller.logIn);
app.post('/auth/signup', controller.signUp);
app.delete('/api/deleteFriendship', controller.deleteFriendship);
app.delete('/api/deleteMessage/:id', controller.deleteMessage);
app.post('/api/TEST', function(req, res){
  var username = req.body;
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PORT
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var port = process.env.PORT || config.server.port;
http.listen(port, function() {
  console.log('Listening now on port ' + port);
});

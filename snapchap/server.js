/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  REQUIREMENTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var cors = require('cors');
var config = require('./config.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pg = require('pg');

var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('devmountain.snapchap.clone', {
  accessKeyId: config.access_key_iD,
  secretAccessKey: config.secret_access_Key
})

var multiParty = require('connect-multiparty');
multiPartyMiddleware = multiParty(); 




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
AWS.config.accessKeyId = config.access_key_iD;
AWS.config.secretAccessKey = config.secret_access_Key;

/////////////////////////////////////////////////////////


var db = massive.connectSync({
  // connectionString: 'postgres://lfplrggqqyouri:q3Gm_eM4QynflveLkI0mVNQ8Yu@ec2-54-235-180-14.compute-1.amazonaws.com:5432/dc0m2p77oia9at'
  // DATABASE_URL=$(heroku config:get DATABASE_URL -a snapchap) your_process
  // connectionString: process.env.DATABASE_URL
  connectionString: config.connectionString
  // connectionString: 'postgres://postgres@localhost:5432/snap'
});

app.set('db', db);

module.exports = {app: app, io: io, config: config};

// AMAZON S3 ADDED


  var s3 = new AWS.S3();

 

////////////////////////////////////////////////////////



var controller = require('./serverControl.js');
app.use(bodyParser.json({limit: '100mb'}));
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./www'));


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


s3.createBucket({Bucket: 'devmountain.snapchap.clone'}, function() {
  console.log("created bucket");
})

app.post('/api/uploadToAWS', function(req, res){
    console.log(req.body)
    var params = {Bucket: 'devmountain.snapchap.clone', Key: req.body.key, Body: req.body.data};
      s3.putObject(params, function(err, data) {
      if (err) res.send(err)
      else res.send("upload was sucessful")
   });
   
  });
 
app.get('/api/downloadFomeAWS', function(req, res){
    var form = new multiparty.Form();
    console.log("form", form)
    form.parse(req, function(err, fields, files) {
       console.log('fields',fields)
    });
  var urlParams = {Bucket: 'devmountain.snapchap.clone', Key: 'code'};
  s3.getSignedUrl('getObject', urlParams, function(err, url){
    // console.log('the url of the image is', url);
    res.send(url)
  })
})



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PORT
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var port = config.server.port;
http.listen(process.env.port || port, function() {
  console.log('Listening now on port ' + port);
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  REQUIREMENTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var cors = require('cors');
var config = require('./config.js');
// var corsOptions = {
//   origin: 'http://localhost:7000'
// };
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

module.exports = {app: app, io: io, config: config};


var db = massive.connectSync({
  connectionString: 'postgres://postgres@localhost:5432/snap'
});

app.set('db', db);

var controller = require('./serverControl.js');
app.use(bodyParser.json());
app.use(cors());
// app.use(cors(corsOptions));

app.use(express.static(__dirname + '/www'));


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  ENDPOINTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.get('/api/me', controller.ensureAuthenticated, controller.getCurrentUser)
app.get('/api/me/:id', controller.ensureAuthenticated, controller.getCurrentUserInfo)
app.get('/user/friends/:id', controller.getUserFriends);
app.get('/api/getMessages/:id', controller.getMessages);
app.get('/api/getPendingFriendRequests/:id', controller.getPendingFriendRequests);
app.put('/api/changeFriendship', controller.acceptFriendship);
app.put('/api/updateRequests', controller.updateRequests);
app.put('/api/updateEmail', controller.updateEmail);
app.put('/api/updateName', controller.updateName);
app.put('/api/updatePassword', controller.updatePassword);
app.put('/api/comparePassword', controller.comparePassword);
app.post('/api/searchUsers', controller.searchUsers);
app.post('/api/uploadMessage', controller.uploadMessage);
app.post('/api/sendRequest', controller.sendRequest);
app.post('/auth/login', controller.logIn);
app.post('/auth/signup', controller.signUp);
app.delete('/api/deleteFriendship', controller.deleteFriendship);
app.post('/api/TEST', function(req, res){
  var username = req.body;
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PORT
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var port = config.port;
http.listen(port, function() {
  console.log('Listening now on port ' + port);
});


io.on('connection', function(socket){

  // io.emit('getAccountInfo',{});

  // socket.emit('getFriends',{});

  // socket.emit('getPendingMessages',{});

  // socket.emit('getPendingFriendRequests',{});

})

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

var app = module.exports = express();

var db = massive.connectSync({
  connectionString: 'postgres://postgres@localhost:5432/snap'
});

var app = module.exports = express();
app.set('db', db);

var controller = require('./serverControl.js');
app.use(bodyParser.json());
// app.use(cors());
// app.use(cors(corsOptions));

app.use(express.static(__dirname + '/www'));


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  ENDPOINTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

app.get('/user/friends/:id', controller.getUserFriends);
app.get('/api/getMessages/:id', controller.getMessages);
app.put('/api/changeFriendship', controller.acceptFriendship);
app.post('/api/uploadMessage', controller.uploadMessage);
app.post('/api/sendRequest', controller.sendRequest);
app.delete('/api/deleteFriendship', controller.deleteFriendship);




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PORT
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var port = config.port;
app.listen(port, function() {
  console.log('Listening now on port ' + port);
});

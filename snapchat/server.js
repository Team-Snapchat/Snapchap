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
  connectionString: 'postgres://ashman@localhost:5432/snap'
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
// app.get('/api/users', controller.getUsers);
// app.get('/api/users/:id', controller.getThisUser);
// app.post('/api/users', controller.postUser);
// app.put('/api/users/info', controller.updateUserInfo);
// app.put('/api/users/password', controller.updatePassword);
app.get('/user/friends/:id', controller.getUserFriends);
// app.post('/user/friend/:id/:friend', controller.addUserFriend);
// app.delete('/user/friend/:id1/:id2', controller.unfriendUserFriend);
//
// app.get('/api/orders/unfilled', controller.getUnfilledOrders);
// app.get('/api/orders/filled', controller.getFilledOrders);
// app.get('/api/orders/:id', controller.getUserOrders);
// app.get('/api/orders/details/:id', controller.getOrderDetails);
// app.post('/api/orders', controller.placeOrder);
// app.put('/api/orders/mark/filled/:id', controller.markOrderFilled);
// app.put('/api/orders/mark/unfilled/:id', controller.markOrderUnfilled);
//
// app.get('/api/products', controller.getProducts); // no login required for this endpoint
// app.put('/api/products/:id', controller.updateProducts);


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PORT
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var port = config.port;
app.listen(port, function() {
  console.log('Listening now on port ' + port);
});

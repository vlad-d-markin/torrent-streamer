var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyBarser = require('body-parser');
var db = require('./backend/db');

app.use(bodyBarser.json());

var usersController = require('./backend/controllers/users');
app.post('/login', usersController.login);
io.on('connection', usersController.handleUserConnenct);

app.use('/', express.static(path.join(__dirname, 'dist')));

var port = process.env.PORT || 8080;
server.listen(port,  function() {
    // db.sync({force: true});
    db.sync();
    console.log('Server is up at' ,port);
});

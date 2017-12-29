var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'dist')));

io.on('connection', function(socket){
    console.log('a user connected');
});

var port = process.env.PORT || 8080;
server.listen(port,  function() {
    console.log('Server is up at' ,port);
});

var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyBarser = require('body-parser');
var db = require('./backend/db');
const webpackConfig = require('./frontend/webpack.config.js');
const compiler = require('webpack')(webpackConfig);

app.use(bodyBarser.json());

var usersController = require('./backend/controllers/users');
app.post('/login', usersController.login);
io.on('connection', usersController.handleUserConnenct);

// Webpack devserver
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

var port = process.env.PORT || 8080;
server.listen(port,  function() {
    // db.sync({force: true}).then(function() {
    // // db.sync().then(function() {
    //     require('./backend/testData')(function() { });
    // });

    console.log('Server is up at' ,port);
});

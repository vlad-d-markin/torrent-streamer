const User = require('../models/User');
const Session = require('../Session');

var activeUsers = {};


module.exports.login = function(req, res) {
    const username = req.body.username;
    if (!username) return res.json({ success: false, error: 'NO_USERNAME' });
    User.findOrCreate({
        where: { username },
        defaults: { username }
    }).spread((user) => {
        res.json({ success: true, user });
    }).catch(error => { res.json({ success: false, error: error }); });
};


module.exports.handleUserConnenct = function(socket) {
    socket.once('init', function(params, cb) {
        User.findById(params.userId)
        .then(user => {
            activeUsers[socket.id] = new Session(socket, user);
            cb(false, user);
            socket.once('disconnect', () => {
                activeUsers[socket.id];
                delete activeUsers[socket.id];
            });
        })
        .catch(error => {
            console.error('Failed to find user', error);
            cb(error);
        });
    });
};

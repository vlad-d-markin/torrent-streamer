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
            const session = new Session(user);
            activeUsers[user.id] = session;
            session.create(function() {
                cb(false, user);                
            });
            socket.once('disconnect', () => {
                session.destroy(function() {
                    delete activeUsers[user.id];
                });
            });
        })
        .catch(error => {
            console.error('Failed to find user', error);
            cb(error);
        });
    });
};

module.exports.handleStreamRequest = function(req, res) {
    const uid = req.query.uid;
    const infoHash = req.params.infoHash;
    const index = req.params.index;
    console.log('Requested stream UID:', uid, 'torrent:', infoHash, '#', index);
    
    const session = activeUsers[uid];    
    if (!session) {
        res.status(404).json({ success: false, error: { message: 'User with id: {' + uid + '} is not logged in' } })
    }
    else {
        session.getStreamFactory(infoHash, index)
            .then(function(factory) {
                const size = factory.file.length;
                res.header({
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': size
                });
                readStream = factory.createReadStream();
                readStream.pipe(res);
            });
    }    
    
};

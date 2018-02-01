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
            var session = activeUsers[user.id];
            if (!session) {
                session = new Session(user);
                session.create(function () {
                    session.attach(socket);
                    socket.once('disconnect', () => {
                        session.detach(socket);
                        if (session.active <= 0) {
                            session.destroy(function(err) {
                                delete activeUsers[user.id];
                            });
                        }
                    });
                    activeUsers[user.id] = session;
                    cb(false, user);
                });
            }
            else {
                session.attach(socket);
                socket.once('disconnect', () => {
                    session.detach(socket);
                    if (session.active <= 0) {
                        session.destroy(function (err) {
                            delete activeUsers[user.id];
                        });
                    }
                });
                cb(false, user);
            }
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
                var range = req.headers.range;
                var readStream;

                if (range !== undefined) {
                    var parts = range.replace(/bytes=/, "").split("-");

                    var partial_start = parts[0];
                    var partial_end = parts[1];

                    if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
                        return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
                    }

                    var start = parseInt(partial_start, 10);
                    var end = partial_end ? parseInt(partial_end, 10) : size - 1;
                    var content_length = (end - start) + 1;

                    res.status(206).header({
                        'Content-Type': 'audio/mpeg',
                        'Content-Length': content_length,
                        'Content-Range': "bytes " + start + "-" + end + "/" + size
                    });

                    readStream = factory.createStream({ start: start, end: end });
                }
                else {
                    res.header({
                        'Content-Type': 'audio/mpeg',
                        'Content-Length': size
                    });
                    readStream = factory.createStream();
                }
                readStream.pipe(res);
            })
            .catch(function(error){
                console.error('Error at handleStreamRequest', error);
            });
    }

};

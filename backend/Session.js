const Track = require('./models/Track');
const Source = require('./models/Source');
const _ = require('lodash');
const async = require('async');
const WebTorrent = require('webtorrent');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const Promise = require('bluebird');

const APP_DIR = path.resolve(__dirname, '..', 'app');
const UID_DIR = path.resolve(APP_DIR, 'uid');
const TORRENT_CACHE_DIR = path.resolve(APP_DIR, 'torrent');


var Session = function(user) {
    this._user = user;
    this._client = new WebTorrent();
    this._directory = path.resolve(UID_DIR, user.get('id'));
};

// Create attach routines
Session.prototype.create = function(cb) {
    if (!fs.existsSync(this._directory)) {
        fs.mkdirSync(this._directory);
    }
    console.log('Created Session for', this._user.get('username'));
    cb(false);
};

Session.prototype.destroy = function(cb) {
    if (fs.existsSync(this._directory)) {
        rimraf(this._directory, function() {
            console.log('Destroyed Session for', this._user.get('username'));
            cb(false);
        });
    }    
};

Session.prototype.attach = function(socket) {
    socket.on('gettracks', this.getTracks.bind(this));
    socket.on('getsources', this.getSources.bind(this));
};

Session.prototype.detach = function(socket) {
    socket.removeAllListeners('gettracks');    
    socket.removeAllListeners('getsources');
};

// Torrent routines

Session.prototype.getStreamFactory = function(infoHash, index) {
    var me = this;
    return me.addTorrentIfNotExists(infoHash)
        .then(function(torrent) {
            const file = torrent.files[index];
            return Promise.resolve({
                torrent, file,
                createStream: function(opts) {
                    return file.createReadStream(opts);
                }
            });
        })
};

Session.prototype.cacheTorrent = function(torrent) {
    return Promise.resolve(torrent);
};

Session.prototype.getCachedTorrentIfExists = function(infoHash) {
    const cached = path.resolve(TORRENT_CACHE_DIR, infoHash);
    return Promise.resolve((fs.existsSync(cached)) ? cached : infoHash);
};

Session.prototype.addTorrentIfNotExists = function(infoHash) {
    var me = this;
    var torrent = this._client.get(infoHash);
    if (torrent) return Promise.resolve(torrent);
    return new Promise(function(resolve, reject) {
        me.getCachedTorrentIfExists(infoHash).then(function(torrentFileOrCache) {
            console.log('Trying to add torrent', infoHash);
            me._client.add( 
                torrentFileOrCache,
                { path: path.resolve(me._directory, infoHash)  },
                function(torrent) {
                    torrent.deselect(0, torrent.pieces.length - 1, false)
                    console.log('Torrent ready', infoHash);
                    resolve(torrent);
                    me.cacheTorrent(torrent);
                }
            );
        });
    });
};


// Data layer routines
Session.prototype.getTracks = function(params, cb) {
    this._user.getTracks()
        .then(function(tracks) {
            var tracksJson = _.map(tracks, function(t) {
                return t.toJSON();
            })
            cb(false, tracksJson);
        })
        .catch(function(error) {
            cb({
                error: '',
                message: error.message
            }, null)
        });
};

Session.prototype.getSources = function(params, cb) {
    this._user.getTracks()
        .then(function (tracks) {
            var sourcePromises = _.map(tracks, function (t) {
                return t.getSource();
            })
            return Promise.all(sourcePromises);
        })
        .then(function(sources) {
            var sourcesJson = _.map(sources, function (s) {
                return s.toJSON();
            })
            cb(false, sourcesJson);
        })
        .catch(function (error) {
            cb({
                error: '',
                message: error.message
            }, null)
        });
}

Session.prototype.onAddTracks = function(params, cb) {
    var addedTracks = {};
    var me = this;
    async.each(params.tracks, (data, asyncCb) => {
        var torrentRec = null;
        var trackRec = null;
        Torrent.findOrCreate({
            where: { infoHash: data.torrent.infoHash },
            defaults: { name: data.torrent.name, infoHash: data.torrent.infoHash }
        })
        .spread(torrent => {
            torrentRec = torrent;
            Track.create({ id: data.id, title: data.title, index: data.index })
            .then(track => {
                trackRec = track;
                return track.setTorrent(torrent);
            })
            .then(track => {
                return me._user.addTrack(trackRec);
            })
            .then(() => {
                addedTracks[trackRec.get('id')] = {
                    id: trackRec.get('id'),
                    title: trackRec.get('title'),
                    index: trackRec.get('index'),
                    torrent: {
                        infoHash: torrentRec.get('infoHash'),
                        name: torrentRec.get('name')
                    }
                };
                asyncCb();
            })
            .catch(error => {
                asyncCb(error);
            });
        })
        .catch(error => {
            asyncCb(error);
        });

    },
    error => {
        if (error) {
            console.error('Add error', error);
            cb({ error: error.message });
        }
        else {
            // console.log(addedTracks);
            cb(false, addedTracks);
        }
    });
};

Session.prototype.onAddSources = function(params, cb) {
    var sourceData = params.sources;
    Source.bulkCreate(sourceData).then(records => {
        var result = {};
        _.each(records, rec => {
            result[rec.id] = rec;
        });
        cb(false, result);
    })
    .catch(error => {
        cb({ error: error.message });
    });
};

module.exports = Session;

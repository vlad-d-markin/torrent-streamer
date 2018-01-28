const Track = require('./models/Track');
const Source = require('./models/Source');
const _ = require('lodash');
const async = require('async');
const Promise = require('bluebird');

var Session = function(socket, user) {
    this._socket = socket;
    this._user = user;

    console.log('Created Session for', user.get('username'));

    socket.on('gettracks', this.getTracks.bind(this));
    socket.on('getsources', this.getSources.bind(this));


    socket.on('addtracks', this.onAddTracks.bind(this));
    socket.on('addsources', this.onAddSources.bind(this));


};

// 6f0c81ca65f338557c4a92ec0d9781713ca484cd
//
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

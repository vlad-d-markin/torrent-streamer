const Track = require('./models/Track');
const Source = require('./models/Source');
const User = require('./models/User');
const _ = require('lodash');
const async = require('async');
const Promise = require('bluebird');

module.exports = function(cb) {

    User.create({ username: 'test' })
        .then(function(user) {
            console.log('### ==> Test user created')
            const testTracks = [
                { id: '65b92add-12cf-41cf-b9dc-5b04b276bd4b', title: 'Trapper', album: 'Завалитор', artist: 'nobody.one' },
                { id: '89d8797c-510a-4925-ac44-88b679479596', title: 'Bring It On', album: 'Завалитор', artist: 'nobody.one' },
                { id: 'a26c8e7c-d029-42e5-9aa9-d586991a6e71', title: 'Rumble', album: 'Завалитор', artist: 'nobody.one' }
            ];
            const testSources = [
                { id: '391b72e3-405a-4489-9e21-80339f17eead', name: 'trapper.mp3', infoHash: '6f0c81ca65f338557c4a92ec0d9781713ca484cd', index: 0 },
                { id: '452920f1-4888-4385-8f05-7c9cf03b6ce0', name: 'bring_it_on.mp3', infoHash: '6f0c81ca65f338557c4a92ec0d9781713ca484cd', index: 1 },
                { id: '628c8dc8-cbf2-474a-8d33-78135b85a2dd', name: 'rumble.mp3', infoHash: '6f0c81ca65f338557c4a92ec0d9781713ca484cd', index: 2 }
            ];
            return Promise.all([
                Track.bulkCreate(testTracks),
                Source.bulkCreate(testSources)
                ])
                .then(function () {
                    return Promise.join(Track.findAll(), Source.findAll(), function (tracks, sources) {
                        return Promise.all(_.map(tracks, function(track, idx) {
                            track.setSource(sources[idx]);
                            return track.save();
                        }))
                    })
                })
                .then(function () {
                    return Track.findAll();
                })
                .then(function (tracks) {
                    console.log('### ==> Add tracks to user')
                    return user.setTracks(tracks);
                })
                .then(function () {
                    console.log('### ==> Test insertion finished')
                })
        })
        .catch(function(error) {
            console.error('### ==> Test data creation FAILED', error);
        })
}

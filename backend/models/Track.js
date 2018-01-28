const Sequelize = require('sequelize');
const db = require('../db');
const Source = require('./Source');
const User = require('./User');

const Track = db.define('track', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    album: {
        type: Sequelize.STRING
    },
    artist: {
        type: Sequelize.STRING
    }
});

Track.belongsTo(Source, { as: 'Source', foreignKey: 'sourceId' });
// Track.belongsToMany(User, { througn: 'track_user' });

module.exports = Track;

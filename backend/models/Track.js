const Sequelize = require('sequelize');
const db = require('../db');
const Torrent = require('./Torrent');

const Track = db.define('track', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    index: {
        type: Sequelize.INTEGER
    }
});

Track.belongsTo(Torrent, { as: 'Torrent' });

module.exports = Track;

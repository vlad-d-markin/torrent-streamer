const Sequelize = require('sequelize');
const db = require('../db');

const Torrent = db.define('torrent', {
    infoHash: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
});

module.exports = Torrent;

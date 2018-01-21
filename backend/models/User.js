const Sequelize = require('sequelize');
const db = require('../db');

const Track = require('./Track');

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    }
});

User.hasMany(Track, { as: 'Tracks' });

module.exports = User;

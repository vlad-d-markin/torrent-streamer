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

User.Tracks = User.belongsToMany(Track, { through: 'user_track' });

module.exports = User;

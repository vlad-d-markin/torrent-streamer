const Sequelize = require('sequelize');
const db = require('../db');

const Source = db.define('source', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true 
    },
    infoHash: {
        type: Sequelize.STRING,
        allowNull: false  
    },
    index: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Source;

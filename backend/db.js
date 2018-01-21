const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'dist', 'db.sqlite');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:' + dbPath);

module.exports = sequelize;

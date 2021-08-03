const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Developer = require('../app/models/Developer');

const connection = new Sequelize(dbConfig);

Developer.init(connection);

module.exports = connection;
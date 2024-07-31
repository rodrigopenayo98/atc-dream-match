const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('atc_dream_match', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
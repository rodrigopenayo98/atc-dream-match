const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('atc_dream_match', 'postgres', '5550129piyuelo', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;

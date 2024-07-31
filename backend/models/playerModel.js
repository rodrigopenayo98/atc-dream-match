const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Team = require('./teamModel');

const Player = sequelize.define('Player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teamId: {
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id'
    }
  }
});

module.exports = Player;
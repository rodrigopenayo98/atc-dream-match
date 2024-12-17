const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Team = require('./teamModel');
const Player = require('./playerModel');

const TeamPlayer = sequelize.define('TeamPlayer', {
  teamId: {
    type: DataTypes.INTEGER,
    references: {
      model: Team,
      key: 'id'
    }
  },
  playerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Player,
      key: 'id'
    }
  }
});

module.exports = TeamPlayer;

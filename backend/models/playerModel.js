const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Player = sequelize.define('Player', {
  player_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  player_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Player;

const axios = require('axios');
const Player = require('../models/playerModel');

exports.getPlayers = async (req, res) => {
  try {
    const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&APIkey=YOUR_API_KEY`);
    const players = response.data;
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const response = await axios.get(`https://apiv3.apifootball.com/?action=get_players&APIkey=YOUR_API_KEY`);
    const players = response.data;
    const player = players.find(p => p.player_id === req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

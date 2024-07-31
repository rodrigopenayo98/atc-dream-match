const axios = require('axios');

// Obtener todos los jugadores desde apifootball
exports.getPlayers = async (req, res) => {
  try {
    const response = await axios.get('https://apifootball.com/api/?action=getPlayers&APIkey=YOUR_API_KEY');
    const players = response.data;
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un jugador por ID
exports.getPlayerById = async (req, res) => {
  try {
    const response = await axios.get(`https://apifootball.com/api/?action=getPlayers&APIkey=YOUR_API_KEY`);
    const players = response.data;
    const player = players.find(p => p.idPlayer === parseInt(req.params.id));
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

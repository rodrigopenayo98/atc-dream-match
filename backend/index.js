const express = require('express');
const sequelize = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api/teams', teamRoutes);

// Endpoint para obtener jugadores desde apifootball
app.get('/api/players', async (req, res) => {
  try {
    const response = await axios.get('https://apifootball.com/api/?action=getPlayers&APIkey=YOUR_API_KEY');
    const players = response.data;
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).send('Error fetching players');
  }
});

// Sincronizar modelos y comenzar el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('No se puede conectar a la base de datos:', err);
});


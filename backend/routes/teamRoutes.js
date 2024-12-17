const express = require('express');
const sequelize = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);

// Sincronizar modelos y comenzar el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('No se puede conectar a la base de datos:', err);
});



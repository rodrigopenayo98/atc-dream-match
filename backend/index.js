const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Configuración de la base de datos
const sequelize = new Sequelize('atc_dream_match', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Definir modelos
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

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

// Middleware
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido a ATC Dream Match');
});

// Sincronizar modelos y comenzar el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('No se puede conectar a la base de datos:', err);
});

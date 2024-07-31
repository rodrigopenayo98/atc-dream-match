const Team = require('../models/teamModel');
const Player = require('../models/playerModel');
const TeamPlayer = require('../models/teamPlayerModel');

// Obtener todos los equipos
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un equipo por ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, { include: [Player] });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo equipo
exports.createTeam = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un equipo por ID
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    await team.update(req.body);
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un equipo por ID
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    await team.destroy();
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Añadir un jugador a un equipo
exports.addPlayerToTeam = async (req, res) => {
  try {
    const { playerId } = req.body;
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    await TeamPlayer.create({ teamId: team.id, playerId });
    res.json({ message: 'Player added to team' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un jugador de un equipo
exports.removePlayerFromTeam = async (req, res) => {
  try {
    await TeamPlayer.destroy({
      where: {
        teamId: req.params.id,
        playerId: req.params.playerId
      }
    });
    res.json({ message: 'Player removed from team' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

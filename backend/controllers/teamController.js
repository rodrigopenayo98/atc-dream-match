const Team = require('../models/teamModel');
const Player = require('../models/playerModel');
const TeamPlayer = require('../models/teamPlayerModel');

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

exports.addPlayerToTeam = async (req, res) => {
  try {
    const { playerId } = req.body;
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const player = await Player.findByPk(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    const teamPlayersCount = await TeamPlayer.count({ where: { teamId: team.id } });
    if (teamPlayersCount >= 5) return res.status(400).json({ message: 'Team is already full' });

    const existingTeamPlayer = await TeamPlayer.findOne({ where: { playerId } });
    if (existingTeamPlayer) return res.status(400).json({ message: 'Player is already in another team' });

    await TeamPlayer.create({ teamId: team.id, playerId });
    res.json({ message: 'Player added to team' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removePlayerFromTeam = async (req, res) => {
  try {
    const { id, playerId } = req.params;
    const team = await Team.findByPk(id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const player = await Player.findByPk(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    await TeamPlayer.destroy({
      where: {
        teamId: team.id,
        playerId: player.id
      }
    });
    res.json({ message: 'Player removed from team' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({ include: Player });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, { include: Player });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const teamCount = await Team.count();
    if (teamCount >= 2) {
      return res.status(400).json({ message: 'Cannot create more than 2 teams' });
    }

    const newTeam = await Team.create({ name });
    res.json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const [updated] = await Team.update({ name }, { where: { id: req.params.id } });
    if (updated) {
      const updatedTeam = await Team.findByPk(req.params.id);
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




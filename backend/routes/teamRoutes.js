const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const playerController = require('../controllers/playerController');

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.post('/', teamController.createTeam);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);
router.post('/:id/players', teamController.addPlayerToTeam);
router.delete('/:id/players/:playerId', teamController.removePlayerFromTeam);

module.exports = router;


const express = require('express');
const router = express.Router();

const tournamentController = require('../controllers/tournamentController');

router.get('/', tournamentController.showTournamentList);
router.get('/add', tournamentController.showAddTournamentForm);
router.get('/details/:tournamentId', tournamentController.showTournamentDetails);

router.post('/add', tournamentController.addTournament);
router.post('/edit', tournamentController.updateTournament);
router.get('/delete/:tournamentId', tournamentController.deleteTournament);

module.exports = router;
const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const tournamentController = require('../controllers/tournamentController');

router.get('/', tournamentController.showTournamentList);
router.get('/add',authUtils.permitAuthenticatedUser, tournamentController.showAddTournamentForm);
router.get('/details/:tournamentId', tournamentController.showTournamentDetails);

router.post('/add',authUtils.permitAuthenticatedUser, tournamentController.addTournament);
router.post('/edit',authUtils.permitAuthenticatedUser, tournamentController.updateTournament);
router.get('/delete/:tournamentId',authUtils.permitAuthenticatedUser, tournamentController.deleteTournament);

module.exports = router;
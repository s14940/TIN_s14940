const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const playerController = require('../controllers/playerController');

router.get('/', playerController.showPlayerList);
router.get('/add', authUtils.permitAuthenticatedUser, playerController.showAddPlayerForm);
router.get('/edit/:playerId', authUtils.permitAuthenticatedUser, playerController.showEditPlayerForm)
router.get('/details/:playerId', playerController.showPlayerDetails);

router.post('/add', authUtils.permitAuthenticatedUser, playerController.addPlayer);
router.post('/edit', authUtils.permitAuthenticatedUser,  playerController.updatePlayer);
router.get('/delete/:playerId', authUtils.permitAuthenticatedUser, playerController.deletePlayer);

module.exports = router;
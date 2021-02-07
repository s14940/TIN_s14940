const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const gameController = require('../controllers/gameController');

router.get('/', gameController.showGameList);
router.get('/add',authUtils.permitAuthenticatedUser, gameController.showAddGameForm);
router.get('/edit/:gameId',authUtils.permitAuthenticatedUser, gameController.showEditGameForm)
router.get('/details/:gameId', gameController.showGameDetails);

router.post('/add',authUtils.permitAuthenticatedUser, gameController.addGame);
router.post('/edit',authUtils.permitAuthenticatedUser, gameController.updateGame);
router.get('/delete/:gameId',authUtils.permitAuthenticatedUser, gameController.deleteGame);

module.exports = router;
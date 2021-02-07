const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const teamController = require('../controllers/teamController');

router.get('/', teamController.showTeamList);
router.get('/add',authUtils.permitAuthenticatedUser, teamController.showAddTeamForm);
router.get('/edit/:teamId',authUtils.permitAuthenticatedUser, teamController.showEditTeamForm);
router.get('/details/:teamId', teamController.showTeamDetails);

router.post('/add', authUtils.permitAuthenticatedUser,teamController.addTeam);
router.post('/edit', authUtils.permitAuthenticatedUser,teamController.updateTeam);
router.get('/delete/:teamId',authUtils.permitAuthenticatedUser, teamController.deleteTeam);

module.exports = router;

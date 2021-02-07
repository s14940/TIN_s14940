const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');

router.get('/', teamController.showTeamList);
router.get('/add', teamController.showAddTeamForm);
router.get('/edit/:teamId', teamController.showEditTeamForm);
router.get('/details/:teamId', teamController.showTeamDetails);

router.post('/add', teamController.addTeam);
router.post('/edit', teamController.updateTeam);
router.get('/delete/:teamId', teamController.deleteTeam);

module.exports = router;

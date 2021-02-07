const express = require('express');
const router = express.Router();

const teamApiController = require('../../api/TeamAPI');

router.get('/', teamApiController.getTeams);
router.get('/:teamId', teamApiController.getTeamsById);
router.post('/', teamApiController.createTeam);
router.put('/:teamId', teamApiController.updateTeam);
router.delete('/:teamId', teamApiController.deleteTeam);

module.exports = router;
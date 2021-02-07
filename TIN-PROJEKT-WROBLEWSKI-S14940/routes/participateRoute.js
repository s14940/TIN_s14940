const express = require('express');
const authUtils = require('../util/authUtils')
const router = express.Router();

const participateController = require('../controllers/participateController');

router.get('/', participateController.showparticipateList);
router.get('/add',authUtils.permitAuthenticatedUser, participateController.showAddparticipateForm);
router.get('/edit/:participateId',authUtils.permitAuthenticatedUser, participateController.showEditparticipateForm);
router.get('/details/:participateId', participateController.showparticipateDetails);

router.post('/add',authUtils.permitAuthenticatedUser, participateController.addparticipate);
router.post('/edit', authUtils.permitAuthenticatedUser,participateController.updateparticipate);
router.get('/delete/:participateId',authUtils.permitAuthenticatedUser, participateController.deleteparticipate);

module.exports = router;
    
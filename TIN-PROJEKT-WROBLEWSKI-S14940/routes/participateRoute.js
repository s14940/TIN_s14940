const express = require('express');
const router = express.Router();

const participateController = require('../controllers/participateController');

router.get('/', participateController.showparticipateList);
router.get('/add', participateController.showAddparticipateForm);
router.get('/edit/:participateId', participateController.showEditparticipateForm);
router.get('/details/:participateId', participateController.showparticipateDetails);

router.post('/add', participateController.addparticipate);
router.post('/edit', participateController.updateparticipate);
router.get('/delete/:participateId', participateController.deleteparticipate);

module.exports = router;

const participateRepository = require('../repository/mysql2/participateRepository');

exports.showparticipateList = (req, res, next) => {
    participateRepository.getparticipates()
        .then(participates => {
            res.render('participate/list', {
                participates: participates,
                navLocation: 'participate'
            });
        });
};

exports.showAddparticipateForm = (req, res, next) => {
    res.render('participate/form', {
        participate: {},
        pageTitle: 'Nowa rejestracja',
        formMode: 'createNew',
        btnLabel: 'Dodaj rejestrację',
        formAction: '/participates/add',
        navLocation: 'participate'
    });
};

exports.showEditparticipateForm = (req, res, next) => {
    const participateId = req.params.participateId;
    participateRepository.getparticipateById(participateId)
        .then(participate => {
            res.render('participate/form', {
                participate: participate,
                formMode: 'edit',
                pageTitle: 'Edycja rejestrację',
                btnLabel: 'Edytuj rejestrację',
                formAction: '/participates/edit',
                navLocation: 'participate'
            });
        });
};

exports.showparticipateDetails = (req, res, next) => {
    const participateId = req.params.participateId;
    participateRepository.getparticipateById(participateId)
        .then(participate => {
            res.render('participate/form', {
                participate: participate,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły rejestracji',
                formAction: '',
                navLocation: 'participate'
            });
        });
};

exports.addparticipate = (req, res, next) => {
    const participateData = { ...req.body };
    participateRepository.createparticipate(participateData)
        .then(result => {
            res.redirect('/participates');
        });
};

exports.updateparticipate = (req, res, next) => {
    const participateId = req.body._id;
    const participateData = { ...req.body };
    participateRepository.updateparticipate(participateId, participateData)
        .then(result => {
            res.redirect('/participates');
        });
};

exports.deleteparticipate = (req, res, next) => {
    const participateId = req.params.participateId;
    participateRepository.deleteparticipate(participateId)
        .then(() => {
            res.redirect('/participates');
        });
};
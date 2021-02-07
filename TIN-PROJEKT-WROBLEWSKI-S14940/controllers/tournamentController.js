const TournamentRepository = require('../repository/mysql2/TournamentRepository');

exports.showTournamentList = (req, res, next) => {
    TournamentRepository.getTournaments()
        .then(tournaments => {
            res.render('tournaments/list', {
                tournaments: tournaments,
                navLocation: 'tournament'
            });
        });
}

exports.showAddTournamentForm = (req, res, next) => {
    res.render('tournaments/form', {
        tournament: {},
        pageTitle: 'Nowy turniej',
        formMode: 'createNew',
        btnLabel: 'Dodaj turniej',
        formAction: '/tournaments/add',
        navLocation: 'tournament'

        ,validationErrors: []
    });
}

exports.showEditTournamentForm = (req, res, next) => {
    const tournamentId = req.params.tournamentId;
    TournamentRepository.getTournamentById(tournamentId)
        .then(tournament => {
            res.render('tournaments/form', {
                tournament: tournament,
                formMode: 'edit',
                pageTitle: 'Edycja turniej',
                btnLabel: 'Edytuj turniej',
                formAction: '/tournaments/edit',
                navLocation: 'tournament',
                validationErrors: []
            });
        });
};

exports.showTournamentDetails = (req, res, next) => {
    const tournamentId = req.params.tournamentId;
    TournamentRepository.getTournamentById(tournamentId)
        .then(tournament => {
            res.render('tournaments/form', {
                tournament: tournament,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły turnieju',
                formAction: '',
                navLocation: 'tournament',
                validationErrors: []
            });
        });
}

exports.addTournament = (req, res, next) => {
    const tournamentData = { ...req.body };
    TournamentRepository.createTournament(tournamentData)
        .then(result => {
            res.redirect('/tournaments')
            .catch(err => {
                res.render('tournament/form', {
                    track: trackData,
                    pageTitle: 'Nowy turniej',
                    formMode: 'createNew',
                    btnLabel: 'Dodaj turniej',
                    formAction: '/tournaments/add',
                    navLocation: 'tournament',
                    validationErrors: err.details
                });
            });
        });
};

exports.updateTournament = (req, res, next) => {
    const tournamentId = req.body._id;
    const tournamentData = { ...req.body };
    TournamentRepository.updateTournament(tournamentId, tournamentData)
        .then(result => {
            res.redirect('/tournaments');
        });
};

exports.deleteTournament = (req, res, next) => {
    const tournamentId = req.params.tournamentId;
    TournamentRepository.deleteTournament(tournamentId)
        .then(() => {
            res.redirect('/tournaments')
            .catch(err => {
                res.render('tournament/form', {
                    track: trackData,
                    formMode: 'edit',
                    pageTitle: 'Edycja turnieju',
                    btnLabel: 'Edytuj turnieju',
                    formAction: '/tournaments/edit',
                    navLocation: 'tournament',
                    validationErrors: err.details
                });
            });
        });
};
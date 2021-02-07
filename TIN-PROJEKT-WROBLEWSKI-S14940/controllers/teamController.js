const TeamRepository = require('../repository/mysql2/TeamRepository');

exports.showTeamList = (req, res, next) => {
    TeamRepository.getTeams()
        .then(teams => {
            res.render('team/list', {
                teams: teams,
                navLocation: 'team'
            });
        });
};

exports.showAddTeamForm = (req, res, next) => {
    res.render('team/form', {
        team: {},
        pageTitle: 'Nowa drużyna',
        formMode: 'createNew',
        btnLabel: 'Dodaj drużynę',
        formAction: '/teams/add',
        navLocation: 'team',
        validationErrors: []
    });
};

exports.showEditTeamForm = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.getTeamById(teamId)
        .then(team => {
            res.render('team/form', {
                team: team,
                formMode: 'edit',
                pageTitle: 'Edycja drużyny',
                btnLabel: 'Edytuj drużynę',
                formAction: '/teams/edit',
                navLocation: 'team'
                ,validationErrors: []
            });
        });
};

exports.showTeamDetails = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.getTeamById(teamId)
        .then(team => {
            res.render('team/form', {
                team: team,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły drużyny',
                formAction: '',
                navLocation: 'team'
                ,validationErrors: []
            });
        });
};

exports.addTeam = (req, res, next) => {
    const teamData = { ...req.body };
    TeamRepository.createTeam(teamData)
        .then(result => {
            res.redirect('/teams');
        })
        .catch(err => {
            res.render('team/form', {
                team: teamData,
                pageTitle: 'Nowa drużyna',
                formMode: 'createNew',
                btnLabel: 'Dodaj drużynę',
                formAction: '/teams/add',
                navLocation: 'team',
                validationErrors: err.details
            });
        });
};

exports.updateTeam = (req, res, next) => {
    const teamId = req.body._id;
    const teamData = { ...req.body };
    TeamRepository.updateTeam(teamId, teamData)
        .then(result => {
            res.redirect('/teams');
        })        .catch(err => {
            res.render('team/form', {
                team: teamData,
                formMode: 'edit',
                pageTitle: 'Edycja drużyny',
                btnLabel: 'Edytuj drużynę',
                formAction: '/teams/edit',
                navLocation: 'team',
                validationErrors: err.details
            });
        });
};

exports.deleteTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.deleteTeam(teamId)
        .then(() => {
            res.redirect('/teams');
        });
};
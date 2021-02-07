  
const PlayerRepository = require('../repository/mysql2/PlayerRepository');
const TeamRepository = require('../repository/mysql2/TeamRepository');

exports.showPlayerList = (req, res, next) => {
    PlayerRepository.getPlayers()
        .then(players => {
            res.render('player/list', {
                players: players,
                navLocation: 'player'
            });
        });
};

exports.showAddPlayerForm = (req, res, next) => {
    TeamRepository.getTeams()
        .then(teams => {
            res.render('player/form', {
                player: {},
                allTeams: teams,
                pageTitle: 'Nowy zawodnik',
                formMode: 'createNew',
                btnLabel: 'Dodaj zawodnika',
                formAction: '/players/add',
                navLocation: 'player',
                validationErrors: []
            });
        });
};

exports.showEditPlayerForm = (req, res, next) => {
    const playerId = req.params.playerId;
    let allTeams;
    TeamRepository.getTeams()
        .then(teams => {
            allTeams = teams
            return PlayerRepository.getPlayerById(playerId);
        })
        .then(player => {
            res.render('player/form', {
                player: player,
                allTeams: allTeams,
                formMode: 'edit',
                pageTitle: 'Edycja zawodnika',
                btnLabel: 'Edytuj zawodnika',
                formAction: '/players/edit',
                navLocation: 'player',
                validationErrors: []
            });
        });
};

exports.showPlayerDetails = (req, res, next) => {
    const playerId = req.params.playerId;
    let allTeams;
    TeamRepository.getTeams()
        .then(teams => {
            allTeams = teams
            return PlayerRepository.getPlayerById(playerId);
        })
        .then(player => {
            res.render('player/form', {
                player: player,
                allTeams: allTeams,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zawodnika',
                formAction: '',
                navLocation: 'player',
                validationErrors: []
            });
        });
};

exports.addPlayer = (req, res, next) => {
    const playerData = { ...req.body };
    PlayerRepository.createPlayer(playerData)
        .then(result => {
            res.redirect('/players');
        })
        .catch(err => {
            res.render('player/form', {
                driver: driverData,
                pageTitle: 'Nowy gracz',
                formMode: 'createNew',
                btnLabel: 'Dodaj gracza',
                formAction: '/players/add',
                navLocation: 'player',
                validationErrors: err.details
            });
        });
};

exports.updatePlayer = (req, res, next) => {
    const playerId = req.body._id;
    const playerData = { ...req.body };
    PlayerRepository.updatePlayer(playerId, playerData)
        .then(result => {
            res.redirect('/players');
        })
        .catch(err => {
            res.render('player/form', {
                driver: driver,
                formMode: 'edit',
                pageTitle: 'Edycja gracza',
                btnLabel: 'Edytuj gracza',
                formAction: '/players/edit',
                navLocation: 'player',
                validationErrors: err.details
            });
        });
};

exports.deletePlayer = (req, res, next) => {
    const playerId = req.params.playerId;
    PlayerRepository.deletePlayer(playerId)
        .then(() => {
            res.redirect('/players');
        });
};
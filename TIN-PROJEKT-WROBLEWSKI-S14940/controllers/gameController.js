const GameRepository = require('../repository/mysql2/GameRepository');
const TournamentRepository = require('../repository/mysql2/TournamentRepository');

exports.showGameList = (req, res, next) => {
    GameRepository.getGames()
        .then(games => {
            res.render('game/list', {
                games: games,
                navLocation: 'game'
            });
        });
};

exports.showAddGameForm = (req, res, next) => {
    TournamentRepository.getTournaments()
        .then(tournaments => {
            res.render('game/form', {
                game: {},
                allTournaments: tournaments,
                pageTitle: 'Nowa gra',
                formMode: 'createNew',
                btnLabel: 'Dodaj grę',
                formAction: '/games/add',
                navLocation: 'game',
                validationErrors: []
            });
        });
};

exports.showEditGameForm = (req, res, next) => {
    const gameId = req.params.gameId;
    let allTournaments;
    TournamentRepository.getTournaments()
        .then(tournaments => {
            allTournaments = tournaments
            return GameRepository.getGameById(gameId);
        })
        .then(game => {
            res.render('game/form', {
                game: game,
                allTournaments: allTournaments,
                formMode: 'edit',
                pageTitle: 'Edycja gry',
                btnLabel: 'Edytuj grę',
                formAction: '/games/edit',
                navLocation: 'game',
                validationErrors: []
            });
        });
};

exports.showGameDetails = (req, res, next) => {
    const gameId = req.params.gameId;
    let allTournaments;
    TournamentRepository.getTournaments()
        .then(tournaments => {
            allTournaments = tournaments
            return GameRepository.getGameById(gameId);
        })
        .then(game => {
            res.render('game/form', {
                game: game,
                allTournaments: allTournaments,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły gry',
                formAction: '',
                navLocation: 'game',
                validationErrors: []
            });
        });
};

exports.addGame = (req, res, next) => {
    const gameData = { ...req.body };
    GameRepository.createGame(gameData)
        .then(result => {
            res.redirect('/games');
        });
};

exports.updateGame = (req, res, next) => {
    const gameId = req.body._id;
    const gameData = { ...req.body };
    GameRepository.updateGame(gameId, gameData)
        .then(result => {
            res.redirect('/games');
        });
};

exports.deleteGame = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.deleteGame(gameId)
        .then(() => {
            res.redirect('/games');
        });
};
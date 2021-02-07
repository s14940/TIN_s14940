const TeamRepository = require('../repository/mysql2/TeamRepository');

exports.getTeams = (req, res, next) => {
    TeamRepository.getTeams()
        .then(drivers => {
            res.status(200).json(drivers);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getTeamsById = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.getTeamById(teamId)
        .then(team => {
            if (!team) {
                res.status(404).json({
                    message: 'Team with id: '+teamId+' not found'
                })
            } else {
                res.status(200).json(team);
            }
        });
};

exports.createTeam = (req, res, next) => {
    TeamRepository.createTeam(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.updateTeam(teamId, req.body)
        .then(result => {
            res.status(200).json({message: 'Team updated!', team: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    TeamRepository.deleteTeam(teamId)
        .then(result => {
            res.status(200).json({message: 'Removed team', team: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
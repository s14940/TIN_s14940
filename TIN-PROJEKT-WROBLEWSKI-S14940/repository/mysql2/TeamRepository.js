const db = require("../../config/mysql2/db");
const teamSchema = require("../../model/joi/Team");

exports.getTeams = () => {
    return db.promise().query("SELECT * FROM Team")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getTeamById = (teamId) => {
    const query = `SELECT 
    t._id as _id, 
    t.name, 
    t.game, 
    p._id as player_id, 
    p.firstName, 
    p.lastName, 
    p.dateOfBirth, 
    p.game as palyerGame, 
    p.team_id
            FROM Team t
            left join Player p on p.team_id = t._id
        where t._id = ?`
    return db.promise().query(query, [teamId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const team = {
                _id: parseInt(teamId),
                name: firstRow.name,
                game: firstRow.teamGame,
                players: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.player_id) {
                    const player = {
                        _id: row.player_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        dateOfBirth: row.dateOfBirth,
                        game: row.playerGame
                    };
                    team.players.push(player);
                }
            }
            return team;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createTeam = (newTeamData) => {
    const vRes = teamSchema.validate(newTeamData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newTeamData.name;
    const game = newTeamData.game;
    const sql = `INSERT into Team (name, game) VALUES (?, ?)`;
    return db.promise().execute(sql, [name, game]);
};

exports.updateTeam = (teamId, teamData) => {
    const vRes = teamSchema.validate(newTeamData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = teamData.name;
    const game = teamData.game;
    const sql = `UPDATE Team set name = ?, game = ? where _id = ?`;
    return db.promise().execute(sql, [name, game, teamId]);
};

exports.deleteTeam = (teamId) => {
    const sql1 = 'DELETE FROM Player where team_id = ?';
    const sql2 = 'DELETE FROM Team where _id = ?';
    return db.promise().execute(sql1, [teamId])
        .then(() => {
            return db.promise().execute(sql2, [teamId])
        });
};
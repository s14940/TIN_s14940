const db = require("../../config/mysql2/db");
const playerSchema = require("../../model/joi/player");

exports.getPlayers = () => {
    return db.promise().query("SELECT * FROM Player")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getPlayerById = (playerId) => {
    const query = `SELECT 
    p._id as _id, 
    p.firstName, 
    p.lastName, 
    p.dateOfBirth, 
    p.game as playerGame, 
    p.team_id,
    t._id as team_id, 
    t.name, 
    t.game as teamGame
            FROM Player p
            left join Team t on t._id = p.team_id
        where p._id = ?`
    return db.promise().query(query, [playerId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const player = {
                _id: parseInt(playerId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                dateOfBirth: firstRow.dateOfBirth,
                game: firstRow.playerGame,
                team: null
            }
            if (firstRow.team_id) {
                const team = {
                    _id: firstRow.team_id,
                    name: firstRow.name,    
                    game: firstRow.teamGame
                };
                player.team = team
            }
            return player;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createPlayer = (newPlayerData) => {
    const vRes = palyerSchema.validate(newPlayerData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const firstName = newPlayerData.firstName;
    const lastName = newPlayerData.lastName;
    const dateOfBirth = newPlayerData.dateOfBirth;
    const game = newPlayerData.game;
    const teamId = newPlayerData.teamId;
    const sql = `INSERT into Player (firstName, lastName, dateOfBirth, game, team_id) VALUES (?, ?, ?, ?, ?)`;
    return db.promise().execute(sql, [firstName, lastName, dateOfBirth, game, teamId]);
};

exports.updatePlayer = (playerId, playerData) => {
    const vRes = playerSchema.validate(playerData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const firstName = playerData.firstName;
    const lastName = playerData.lastName;
    const dateOfBirth = playerData.dateOfBirth;
    const game = playerData.game;
    const teamId = playerData.teamId;
    const sql = `UPDATE Player set firstName = ?, lastName = ?, dateOfBirth = ?, game = ?, team_id = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, dateOfBirth, game, teamId, playerId]);
};

exports.deletePlayer = (playerId) => {
    const sql = 'DELETE FROM Player where _id = ?';
    return db.promise().execute(sql, [playerId]);
};
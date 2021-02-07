    const db = require("../../config/mysql2/db");
    const gameSchema = require("../../model/joi/Game");

exports.getGames = () => {
    return db.promise().query("SELECT * FROM Game")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getGameById = (gameId) => {
    const query = `SELECT 
    g._id as _id, 
    g.name, 
    g.date, 
    g.turs, 
    g.tournament_id,
    t._id as tournament_id, 
    t.location, 
    t.price
            FROM Game g
            left join Tournament t on t._id = g.tournament_id
        where g._id = ?`
    return db.promise().query(query, [gameId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const game = {
                _id: parseInt(gameId),
                name: firstRow.name,
                date: firstRow.date,
                turs: firstRow.turs,
                tournament: null
            }
            if (firstRow.tournament_id) {
                const tournament = {
                    _id: firstRow.tournament_id,
                    location: firstRow.location,
                    price: firstRow.price
                };
                game.tournament = tournament
            }
            return game;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createGame = (newGameData) => {
    const vRes = gameSchema.validate(newGameData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newGameData.name;
    const date = newGameData.date;
    const turs = newGameData.turs;
    const tournamentId = newGameData.tournamentId;
    const sql = `INSERT into Game (name, date, turs, tournament_id) VALUES (?, ?, ?, ?)`;
    return db.promise().execute(sql, [name, date, turs, tournamentId]);
};

exports.updateGame = (gameId, gameData) => {
    const vRes = gameSchema.validate(gameData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    
    const name = gameData.name;
    const date = gameData.date;
    const turs = gameData.turs;
    const tournamentId = gameData.tournamentId;
    const sql = `UPDATE Game set name = ?, date = ?, turs = ?, tournament_id = ? where _id = ?`;
    return db.promise().execute(sql, [name, date, turs, tournamentId, gameId]);
};

exports.deleteGame = (gameId) => {
    const sql = 'DELETE FROM Game where _id = ?';
    return db.promise().execute(sql, [gameId]);
};
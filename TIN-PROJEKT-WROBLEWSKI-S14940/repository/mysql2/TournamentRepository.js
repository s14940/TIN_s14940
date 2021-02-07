const db = require("../../config/mysql2/db");
const tournamentSchema = require("../../model/joi/Tournament");

exports.getTournaments = () => {
    return db.promise().query("SELECT * FROM Tournament")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getTournamentById = (tournamentId) => {
    const query = `SELECT 
    t._id as _id, 
    t.location, 
    t.price,
    g._id as game_id, 
    g.name, 
    g.date, 
    g.turs, 
    g.tournament_id
            FROM Tournament t
            left join Game g on g.tournament_id = t._id
        where t._id = ?`
    return db.promise().query(query, [tournamentId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const tournament = {
                _id: parseInt(tournamentId),
                location: firstRow.location,
                price: firstRow.price,
                games: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.game_id) {
                    const game = {
                        _id: row.game_id,
                        name: row.name,
                        date: row.date,
                        tours: row.tours
                    };
                    tournament.games.push(game);
                }
            }
            return tournament;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createTournament = (newTournamentData) => {
    const vRes =tournamentkSchema.validate(newTournamentkData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const location = newTournamentData.location;
    const price = newTournamentData.price;
    const sql = `INSERT into Tournament (location, price) VALUES (?, ?)`;
    return db.promise().execute(sql, [location, price]);
};

exports.updateTournament = (tournamentId, tournamentData) => {
    const vRes =tournamentkSchema.validate(tournamentkData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const location = tournamentData.location;
    const price = tournamentData.price;
    const sql = `UPDATE Tournament set location = ?, price = ?, where _id = ?`;
    return db.promise().execute(sql, [location, price, tournamentId]);
};

exports.deleteTournament = (tournamentId) => {
    const sql1 = 'DELETE FROM Game where tournament_id = ?';
    const sql2 = 'DELETE FROM Tournament where _id = ?';
    return db.promise().execute(sql1, [tournamentId])
        .then(() => {
            return db.promise().execute(sql2, [tournamentId])
        });
};
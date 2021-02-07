const db = require("../../config/mysql2/db");
const playerSchema = require("../../model/joi/Participate");

exports.getparticipates = () => {
    return db.promise().query("SELECT * FROM Participate")
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getparticipateById = (participateId) => {
    const query = `SELECT 
    p._id as _id, 
    p.date, 
    p.tournament_id,
    p.team_id,
    t._id as tournament_id, 
    t.location, 
    t.price,
    e._id as team_id,
    e.name
            FROM Participate p
            left join Tournament t on t._id = p.tournament_id
            left join Team e on e._id = p.team_id
        where p._id = ?`
    return db.promise().query(query, [participateId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const participate = {
                _id: parseInt(participateId),
                date: firstRow.date,
                turs: firstRow.turs,
                team: []
                
            }
            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if(row.team_id) {
                    const team = {
                        _id: row.temp_id,
                        name: row.name,
                        tournament: {
                            _id: row.tournament_id,
                            location: row.location,
                            proce: row.price
                        }
                    };
                    participate.team.push(participate);
                    }
                }
            
            return participate;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createparticipate = (newParticipateData) => {
    const date = newParticipateData.date;
    const teamId = newParticipateData.teamId;
    const tournamentId = newParticipateData.tournamentId;
    const sql = `INSERT into Participate (date, team_id, tournament_id) VALUES (?, ?, ?)`;
    return db.promise().execute(sql, [date, teamId, tournamentId]);
};

exports.updateparticipate = (participateId, participateData) => {
    const date = participateData.date;
    const teamID = participateData.teamId;
    const tournamentId = participateData.tournamentId;
    const sql = `UPDATE Participate set  date = ?, team_id = ?, tournament_id = ? where _id = ?`;
    return db.promise().execute(sql, [ date, teamId, tournamentId, participateId]);
};

exports.deleteparticipate = (participateId) => {
    const sql = 'DELETE FROM Participate where _id = ?';
    return db.promise().execute(sql, [participateId]);
};
  
const db = require("../../config/mysql2/db");

exports.findByLogin = (login) => {
    const query = `SELECT _id, login, password FROM User where login = ?`
    return db.promise().query(query, [login])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const user = {
                _id: parseInt(firstRow._id),
                login: firstRow.login,
                password: firstRow.password
            }
            return user;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};
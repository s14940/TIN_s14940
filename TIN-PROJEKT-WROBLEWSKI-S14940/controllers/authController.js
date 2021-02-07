const UserRepository = require('../repository/mysql2/UserRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    UserRepository.findByLogin(login)
        .then(user => {
            if(!user) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy login lub hasło"
                })
            } else if(authUtil.comparePasswords(password, user.password) === true) {
                req.session.loggedUser = user;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy login lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
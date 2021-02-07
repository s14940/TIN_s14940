const UserRepository = require('../repository/mysql2/UserRepository');

exports.findByLogin = (req, res, next) => {
    const login = req.params.login;
    UserRepository.findByLogin(login)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'User with login: '+login+' not found'
                })
            } else {
                res.status(200).json(user);
            }
        });
};

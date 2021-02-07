var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

var indexRouter = require('./routes/index');
const playerRouter = require('./routes/playerRoute');
const gameRouter = require('./routes/gameRoute');
const teamRouter = require('./routes/teamRoute');
const participateRouter = require('./routes/participateRoute');
const tournamentRouter = require('./routes/tournamentRoute');
const playerApiRouter = require('./routes/api/PlayerApiRoute');
const gameApiRouter = require('./routes/api/GameApiRoute');
const teamApiRouter = require('./routes/api/TeamApiRoute');
const tournamentApiRouter = require('./routes/api/TournamentApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/players', playerRouter);
app.use('/games', gameRouter);
app.use('/teams', teamRouter);
app.use('/participates', participateRouter);
app.use('/tournaments', tournamentRouter);
app.use('/api/players', playerApiRouter);
app.use('/api/games', gameApiRouter);
app.use('/api/teams', teamApiRouter);
app.use('/api/tournament', tournamentApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//Express stuff
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Environment variables
var env = require('./env');

//Used by Passport
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;

//Used by Stylus
var stylus = require('stylus');
var nib = require('nib');
//Compiles a Stylus file
var compileStylus = function compile(str, path) {
	return stylus(str).set('filename', path).use(nib());
};

//Used by JSX
var jsxMiddleware = require('jsx-middleware');

//Routers
var index = require('./routes/index');
var users = require('./routes/users');

//App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);

//Stylus middleware
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compileStylus
}));
//JSx middleware
app.use(jsxMiddleware(__dirname + '/public'));

app.use(express.static(path.join(__dirname, 'public')));

var Account = require('./models/userAccount');

passport.use(new passportLocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://' + env.db.host + ':' + env.db.port + '/' + env.db.name);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

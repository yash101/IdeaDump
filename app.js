var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var stylus = require('stylus');
var nib = require('nib');

var environment = require('./env');

var index = require('./routes/index');
var auth = require('./routes/auth');

var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;

var app = express();

var compileStylus = function compile(str, path) {
  return stylus(str).set('filename', path).use(nib());
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middleware setuip
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compileStylus
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	req.db = db;
	next();
});

//Route setup
app.use('/', index);
app.use('/auth', auth);

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

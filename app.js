//=======================[IMPORTS]==================================
//Express stuff
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = require('./config/env');

//Used by JSX
var jsxMiddleware = require('jsx-middleware');

//Used by Stylus
var stylus = require('stylus');
var nib = require('nib');
var compileStylus = function compile(str, path) {
	return stylus(str).set('filename', path).use(nib());
};

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

//=======================[DATABASE]=================================
var db_conf = require('./config/get_db');
mongoose.connect(db_conf.path);

//=======================[CREATE APP]===============================
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if(env.favicon)
  app.use(favicon(path.join(__dirname, 'public', env.favicon)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//=======================[PASSPORT]=================================
app.use(session({
  secret: env.auth.SECRET || 'development-secret',
  magAge: new Date(Date.now() + 3600000),
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

//=======================[ROUTERS]==================================
var index = require('./routes/index');
var users = require('./routes/users');
app.use('/', index);
app.use('/users', users);


//=======================[STYLUS+JSX]===============================
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compileStylus
}));
app.use(jsxMiddleware(__dirname + '/public'));


//=======================[STATIC SERVING]===========================
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//=======================[ERROR HANDLING]===========================
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

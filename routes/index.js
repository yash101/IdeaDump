var express = require('express');
var passport = require('passport');
var router = express.Router();

var isLoggedIn = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
};


/* GET home page. */
router.get('/', function(req, res) {
	console.log('in');
	res.render('index');
});

router.get('/login', function(req, res) {
	res.render('login', {message: req.flash('loginMessage')});
});

router.get('/signup', function(req, res) {
	res.render('signup', {message: req.flash('signupMessage')});
});

router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile', {
		user: req.user
	});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;
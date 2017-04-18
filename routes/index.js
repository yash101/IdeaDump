var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
	res.render("helloworld", {title: 'Hello World!'});
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, found) {
		res.render('userlist', {
			"userlist": found
		});
	});
});

router.get("/newuser", function(req, res) {
	res.render('newuser', {title: "Add new user"});
});

router.post("/adduser", function(req, res) {
	var db = req.db;
	var name = req.body.username;
	var email = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		'username': name,
		'email': email
	}, function(err, result) {
		if(err) {
			res.send("Error!");
		} else {
			res.redirect("newuser");
		}
	});
});

module.exports = router;

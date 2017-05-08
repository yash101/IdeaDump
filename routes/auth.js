var express = require('express');
var router = express.Router();
var users_db = require('../server/db/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
	res.send(req.body);
});

router.get('/randomKey', function(req, res, next) {
	var len = 64;
	if(req.param('len')) len = parseInt(req.param('len'));
	var hex = req.param('hex') == 'false' || true;
	users_db.newSecureKey(len, hex, function(ret) {
		res.send(ret);
	});
});

module.exports = router;

(function() {
	var mongoose = require('mongoose');
	var env = require('./env');
	module.exports = {};
	module.exports.path = 'mongodb://' + env.db.user + ':' + env.db.password + '@' + env.db.host + ':' + env.db.port + '/' + env.db.name;
	module.exports.connect = function connect() {
		return mongoose.connect(module.exports.path);		
	};
})();
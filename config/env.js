(function() {
	module.exports = {};
	module.exports.db = {};
	module.exports.db.host = process.env.MONGO_HOST || 'localhost';
	module.exports.db.port = process.env.MONGO_PORT || "27017";
	module.exports.db.name = process.env.MONGO_DB_NAME || 'ideadump';
	module.exports.db.user = process.env.MONGO_USER || '';
	module.exports.db.pass = process.env.MONGO_PASS || '';

	module.exports.auth = {};
	module.exports.SECRET = process.env.SECRET;
})();
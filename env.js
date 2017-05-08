;(function env_js() {
	var env = env || {};
	env.dbHost = "localhost";
	env.dbPort = 27017;
	env.dbName = "IdeaPad";

	env.sessionExpiryLength = 60 * 60 * 30;

	module.exports = env;
})();
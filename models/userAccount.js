(function() {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var ppLocalMongoose = require('passport-local-mongoose');

	var Account = new Schema({
		username: String,
		password: String
	});

	Account.plugin(ppLocalMongoose);

	module.exports = mongoose.model('Account', Account);
})();
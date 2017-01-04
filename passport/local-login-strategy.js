var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, 
function(req, email, password, next){
	User.findOne({ $or: [
		{ 'local.email': email }, 
		{ 'username': req.body.username }
  ]}, 
		function(err, foundUser){
			if (err){
				return next(err);
			}
			else if (!foundUser) {
				return next(null, false, req.flash('error', 'User not found.'));
			}
			else if (!foundUser.isValidPassword(password)){
				return next(null, false, req.flash('error', 'Oops! Wrong email/username or password.'));
			}
			else {
				return next(null, user);
			}
		});
});

module.exports = strategy;
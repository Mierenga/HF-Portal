var express = require('express');
var app = express();
var bcrypt = require('bcrypt');

var models = require('../models');
var Users = models.users;

// POST /users/login - try to login a user
app.post('/login', function loginUser(req, res) {

	Users.findOne({
		where: {
			email: req.body.email
		}
	}).then(function(user) {
		bcrypt.compare(req.body.password, user.password, function(err, res) {
			if(res === true) {
				console.log('password is correct!');
			} else {
				console.log('Wrong password!');
			}
		});
		res.send(user);
	});

});

app.post('/create', function createUser(req, res) {

	//console.log('creating');
	//console.log(req.body);
	Users.findOne({
		where: {
			email: req.body.email
		}
	}).then(function(user) {

		if( user === null ) {

			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					Users.create({
						email: req.body.email,
						password: hash,
						userType: req.body.userType
					}).then(function(user) {

						console.log(user);
						res.send(user);
					});
				});
			});
			
		}else{


			res.send("User already exists");
		}
	});

	
});

module.exports = app;
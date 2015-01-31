var jwt = require('jsonwebtoken');

var User = require('../models/user');
var config = require('../config/config');

module.exports = {

  signup: function(req, res) {
    var user = new User({
      uid: req.body.username.toLowerCase(),
      username: req.body.username,
      password: req.body.password 
    });

    User.findOne({ username: user.username }, function(err, existingUser) {
      if (err) return res.json(({ success: false, message: 'Registration failed. Something bad happen.' }));
      if (existingUser) return res.json({ success: false, message: 'Registration Failed. User already exists. '});
      user.save(function(err) {
        if (err) return res.json(({ success: false, message: 'Registration failed. Something bad happen.' }));
        var token = jwt.sign({ uid: user.uid }, config.tokenSecret);
        res.json({ success: true, message: 'You have registered! Enjoy your token!', token: token });
      });
    });
  },

  login: function(req, res) {
    User.findOne({ uid: req.body.username.toLowerCase() }, function(err, user) {
      if (err) return res.json({ success: false, message: 'Authentication failed. Something bad happen!' });
      if (!user) return res.json({ success: false, message: 'Authentication failed. User not found.' });

      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) return res.json({ success: false, message: 'Authentication failed. Wrong password.' });

      var token = jwt.sign({ uid: user.uid }, config.tokenSecret);

      res.json({success: true, message: 'You are now logined! Enjoy your token!', token: token });
    });   
  }

};
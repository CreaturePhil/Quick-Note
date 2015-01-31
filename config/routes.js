var express = require('express');
var path = require('path');

var userController = require('../controllers/user_controller');

var router = express.Router();

router.route('/signup')
  .post(userController.signup);

router.route('/login')
  .post(userController.login);

router.route('*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app/views/index.html'));
  });


module.exports = router;
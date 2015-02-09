var express = require('express');
var path = require('path');

var userController = require('../controllers/user_controller');
var noteController = require('../controllers/note_controller');

var router = express.Router();

router.route('/signup')
  .post(userController.signup);

router.route('/login')
  .post(userController.login);

router.route('/api/note')
  .get(noteController.index)
  .post(noteController.add);

router.route('*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app/views/index.html'));
  });


module.exports = router;

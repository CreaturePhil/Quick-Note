var express = require('express');

var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.send('Quick Note!');
  });

module.exports = router;
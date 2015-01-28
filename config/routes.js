var express = require('express');
var path = require('path');

var router = express.Router();

router.route('*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app/views/index.html'));
  });


module.exports = router;
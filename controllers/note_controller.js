var crypto = require('crypto');
var Note = require('../models/note');

module.exports = {

  add: function(req, res) {
    var token = crypto.randomBytes(4).toString('hex');
    var note = new Note({
      nid: token,
      content: req.body.content,
      author: 'Anonymous',
      visibility: req.body.visibility
    }); 
    note.save(function(err) {
      if (err) return res.json({ success: false, message: 'Failed to saved.' });
      res.json({ success: true, message: 'Successfully saved.' })
    });
  }

};

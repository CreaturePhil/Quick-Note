var async = require('async');
var crypto = require('crypto');
var Note = require('../models/note');

module.exports = {

  index: function(req, res) {
    Note.find({'visibility': 'Public'}, function(err, notes) {
      if (err) return res.json({ success: false, message: 'Failed to fetch notes. Something bad happen!' });
      async.map(notes, function(noteModel, cb) {
        var note = noteModel.toObject();
        delete note._id;
        cb(null, note);
      }, function(err, results) {
        if (err) return res.json({ success: false, message: 'Failed to fetch notes. Something bad happen!' });
        res.json({ success: true, notes: results });
      });
    });
  },

  add: function(req, res) {
    var token = crypto.randomBytes(4).toString('hex');
    var note = new Note({
      nid: token,
      title: req.body.title,
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

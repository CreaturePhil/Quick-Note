var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  nid: { type: String, unique: true },
  title: String,
  date: { type: Date, default: Date.now() },
  content: String,
  author: String,
  visibility: String
});

module.exports = mongoose.model('note', noteSchema);

const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

NotesSchema.index({ timestamp: -1 });
module.exports = mongoose.model('Notes', NotesSchema);
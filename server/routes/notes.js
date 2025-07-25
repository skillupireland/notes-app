const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/notes - Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ timestamp: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/notes - Create new note
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
    }
    
    const note = new Note({ text });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error('Error posting notes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      setNotes(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post('/api/notes', {
        text: newNote.trim()
      });
      
      // Add new note to the beginning of the list
      setNotes([response.data, ...notes]);
      setNewNotes('');
      setError('');
    } catch (err) {
      setError('Failed to post note');
      console.error('Error posting note:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Notes</h1>
        <p>Share your thoughts with the world!</p>
      </div>

      {/* Message Form */}
      <div className="note-form-container">
        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <textarea
              value={newNote}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Write your note here..."
              className="note-input"
              rows="3"
              maxLength="500"
              disabled={loading}
            />
          </div>
          <div className="form-actions">
            <span className="char-count">{newNote.length}/500</span>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !newNote.trim()}
            >
              {loading ? 'Loading...' : 'Post Note'}
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-note">
          {error}
          <button onClick={() => setError('')} className="error-close">×</button>
        </div>
      )}

      {/* Notes List */}
      <div className="notes-list">
        {loading && notes.length === 0 ? (
          <div className="loading">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="no-notes">
            <p>No notes yet. Be the first to say hello!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <div key={note._id} className="note-card">
                <p className="note-text">{note.text}</p>
                <div className="note-meta">
                  <span className="note-time">
                    {formatTimestamp(note.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="refresh-section">
        <button 
          onClick={fetchNotes} 
          className="btn btn-secondary"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Notes'}
        </button>
      </div>
    </div>
  );
};

export default Notes;
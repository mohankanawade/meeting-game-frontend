import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.txt')) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a .txt file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading transcript...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadStatus('Analyzing meeting...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadStatus('Extracting key moments...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadStatus('Generating quiz...');
      
      const response = await axios.post(
        'https://meeting-game-backend.onrender.com/upload-transcript',
        formData
      );

      // Navigate to dashboard with meeting data
      navigate('/dashboard', { 
        state: { 
          meetingId: response.data.meeting_id,
          analysis: response.data.analysis 
        } 
      });

    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
      setUploadStatus('');
    }
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>📝 Were You Actually There?</h1>
        <p className="subtitle">Transform meeting transcripts into engagement insights</p>
      </div>

      <div className="upload-section">
        <div className="upload-box">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            id="file-input"
            className="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            📁 {file ? file.name : 'Choose Google Meet transcript (.txt)'}
          </label>
          
          {file && (
            <button onClick={handleUpload} className="btn-primary" disabled={loading}>
              {loading ? 'Processing...' : 'Analyze Meeting'}
            </button>
          )}
        </div>

        {loading && (
          <div className="status-box">
            <div className="spinner"></div>
            <p>{uploadStatus}</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>📊 Smart Analysis</h3>
          <p>Extract decisions, action items, and topics</p>
        </div>
        <div className="feature-card">
          <h3>🎮 Engagement Quiz</h3>
          <p>Test who was actually paying attention</p>
        </div>
        <div className="feature-card">
          <h3>🏆 Leaderboard</h3>
          <p>See who's the meeting champion</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
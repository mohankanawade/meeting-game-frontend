import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, correct, total, badge, meetingId, playerName } = location.state || {};

  if (!score) {
    return (
      <div className="container">
        <h2>No results found</h2>
        <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="results-card">
        <h1>🎯 Quiz Results</h1>
        
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{Math.round(score)}%</span>
          </div>
          <h2>{playerName}</h2>
          <div className="badge">{badge}</div>
        </div>

        <div className="score-details">
          <p>Correct Answers: <strong>{correct}/{total}</strong></p>
        </div>

        <div className="button-group">
          <button 
            onClick={() => navigate(`/leaderboard/${meetingId}`)}
            className="btn-primary"
          >
            🏆 View Leaderboard
          </button>
          <button 
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
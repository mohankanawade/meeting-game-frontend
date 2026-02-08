import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { meetingId, analysis } = location.state || {};

  if (!analysis) {
    return (
      <div className="container">
        <h2>No meeting data found</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  const shareQuizLink = () => {
    const quizUrl = `${window.location.origin}/quiz/${meetingId}`;
    navigator.clipboard.writeText(quizUrl);
    alert('Quiz link copied to clipboard!');
  };

  return (
    <div className="container">
      <h1>📊 Meeting Analytics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>⏱️ Duration</h3>
          <p className="stat-value">{analysis.duration_minutes} min</p>
        </div>
        <div className="stat-card">
          <h3>👥 Participants</h3>
          <p className="stat-value">{analysis.participants.length}</p>
        </div>
        <div className="stat-card">
          <h3>✅ Key Decisions</h3>
          <p className="stat-value">{analysis.key_decisions.length}</p>
        </div>
        <div className="stat-card">
          <h3>📋 Action Items</h3>
          <p className="stat-value">{analysis.action_items.length}</p>
        </div>
      </div>

      <div className="section">
        <h2>📌 Key Highlights</h2>
        
        <div className="highlight-box">
          <h3>Decisions Made:</h3>
          {analysis.key_decisions.map((decision, idx) => (
            <div key={idx} className="highlight-item">
              ✓ {decision.decision} 
              <span className="meta"> (by {decision.proposed_by})</span>
            </div>
          ))}
        </div>

        <div className="highlight-box">
          <h3>Action Items:</h3>
          {analysis.action_items.map((item, idx) => (
            <div key={idx} className="highlight-item">
              → {item.item}
              <span className="meta"> (assigned to {item.assignee})</span>
            </div>
          ))}
        </div>

        {analysis.ignored_topics.length > 0 && (
          <div className="highlight-box warning">
            <h3>⚠️ Topics Mentioned but Not Discussed:</h3>
            {analysis.ignored_topics.map((topic, idx) => (
              <div key={idx} className="highlight-item">{topic}</div>
            ))}
          </div>
        )}
      </div>

      <div className="quiz-ready">
        <h2>🎮 Quiz is Ready!</h2>
        <p>Share the quiz link with participants to test their engagement</p>
        <div className="button-group">
          <button onClick={shareQuizLink} className="btn-secondary">
            📋 Copy Quiz Link
          </button>
          <button 
            onClick={() => navigate(`/quiz/${meetingId}`)} 
            className="btn-primary"
          >
            🎯 Take Quiz Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
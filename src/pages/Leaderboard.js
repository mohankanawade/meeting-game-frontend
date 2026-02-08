import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Leaderboard() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`https://meeting-game-backend.onrender.com/leaderboard/${meetingId}`);
      setLeaderboard(response.data.leaderboard);
      setLoading(false);
    } catch (error) {
      alert('Leaderboard not found');
      navigate('/');
    }
  };

  if (loading) {
    return <div className="container"><div className="spinner"></div></div>;
  }

  return (
    <div className="container">
      <h1>🏆 Meeting Leaderboard</h1>
      
      <div className="leaderboard">
        {leaderboard.map((player, idx) => (
          <div key={idx} className={`leaderboard-item rank-${idx + 1}`}>
            <div className="rank">{idx + 1}</div>
            <div className="player-info">
              <div className="player-name">{player.name}</div>
              <div className="player-badge">{player.badge}</div>
            </div>
            <div className="player-score">{Math.round(player.score)}%</div>
          </div>
        ))}
      </div>

      {leaderboard.length === 0 && (
        <p className="empty-state">No participants yet. Be the first to take the quiz!</p>
      )}

      <button onClick={() => navigate('/')} className="btn-secondary">
        🏠 Home
      </button>
    </div>
  );
}

export default Leaderboard;
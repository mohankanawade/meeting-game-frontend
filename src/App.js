import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:meetingId" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/leaderboard/:meetingId" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
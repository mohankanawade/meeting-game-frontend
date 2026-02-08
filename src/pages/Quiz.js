import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  
  const [playerName, setPlayerName] = useState('');
  const [started, setStarted] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [meetingId]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`https://meeting-game-backend.onrender.com/quiz/${meetingId}`);
      setQuiz(response.data);
      setLoading(false);
    } catch (error) {
      alert('Quiz not found!');
      navigate('/');
    }
  };

  const handleStart = () => {
    if (playerName.trim()) {
      setStarted(true);
    } else {
      alert('Please enter your name');
    }
  };

  const handleAnswer = () => {
    if (selectedOption === null) {
      alert('Please select an option');
      return;
    }

    const newAnswers = [
      ...answers,
      {
        question_id: quiz.questions[currentQuestion].id,
        selected_option: selectedOption
      }
    ];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    try {
      const response = await axios.post('https://meeting-game-backend.onrender.com/submit-quiz', {
        meeting_id: meetingId,
        player_name: playerName,
        answers: finalAnswers
      });

      navigate('/results', {
        state: {
          score: response.data.score,
          correct: response.data.correct,
          total: response.data.total,
          badge: response.data.badge,
          meetingId: meetingId,
          playerName: playerName
        }
      });
    } catch (error) {
      alert('Submission failed');
    }
  };

  if (loading) {
    return <div className="container"><div className="spinner"></div></div>;
  }

  if (!started) {
    return (
      <div className="container">
        <div className="quiz-intro">
          <h1>🎮 Meeting Engagement Quiz</h1>
          <p>Test your memory of the meeting!</p>
          
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="name-input"
          />
          
          <button onClick={handleStart} className="btn-primary">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="container">
      <div className="quiz-header">
        <h2>Question {currentQuestion + 1}/{quiz.questions.length}</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="question-card">
        <h3>{question.question}</h3>
        
        <div className="options">
          {question.options.map((option, idx) => (
            <div
              key={idx}
              className={`option ${selectedOption === idx ? 'selected' : ''}`}
              onClick={() => setSelectedOption(idx)}
            >
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              <span>{option}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={handleAnswer} 
          className="btn-primary"
          disabled={selectedOption === null}
        >
          {currentQuestion < quiz.questions.length - 1 ? 'Next Question →' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
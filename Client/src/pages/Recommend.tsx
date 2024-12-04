import React, { useState } from 'react';
import './Recommend.css';
import { useAuth } from '../context/AuthContext'; // AuthContext 가져오기

const studyStrategies = [
  {
    strategy: "Active Recall",
    description: "Test yourself rather than passively reviewing. It strengthens memory.",
  },
  {
    strategy: "Pomodoro Technique",
    description: "Work in focused intervals with breaks to boost focus and prevent burnout.",
  },
  {
    strategy: "Spaced Repetition",
    description: "Review material at increasing intervals to enhance long-term memory.",
  },
  {
    strategy: "Mind Mapping",
    description: "Visualize relationships between concepts for better understanding.",
  },
  {
    strategy: "Feynman Technique",
    description: "Explain a concept in simple terms to find and fill knowledge gaps.",
  },
];

const Recommend: React.FC = () => {
  const { currentUser } = useAuth(); // Profile에서 사용하는 currentUser 가져오기
  const [selectedStrategy, setSelectedStrategy] = useState<{
    strategy: string;
    description: string;
  } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showClaw, setShowClaw] = useState(false);

  const handleDraw = () => {
    setIsDrawing(true);
    setShowClaw(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * studyStrategies.length);
      setSelectedStrategy(studyStrategies[randomIndex]);
      setIsDrawing(false);
      setShowClaw(false);
    }, 3000);
  };

  const handleResetAndDraw = () => {
    setSelectedStrategy(null);
    handleDraw();
  };

  if (!currentUser) {
    // currentUser가 없으면 로그인 요청
    return (
      <div className="recommend-container">
        <h1>Recommendation System</h1>
        <p>Please log in to access the recommendations.</p>
      </div>
    );
  }

  return (
    <div className="recommend-container">
      <h1>Study Machine</h1>
      <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
      {!isDrawing && !selectedStrategy && (
        <button onClick={handleDraw} className="reveal-button">
          Insert Coin
        </button>
      )}
      {selectedStrategy && !isDrawing && (
        <button onClick={handleResetAndDraw} className="reset-button">
          Reinsert Coin
        </button>
      )}
      <div className={`claw-machine ${isDrawing ? 'active' : ''}`}>
        {showClaw && <div className="claw"></div>}
        <div className="prize-box">
          {isDrawing && <div className="prize-placeholder">🤖</div>}
          {!isDrawing && selectedStrategy && (
            <div className="prize">
              <h2>{selectedStrategy.strategy}</h2>
              <p className="description">{selectedStrategy.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;

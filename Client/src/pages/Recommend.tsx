import React, { useState } from 'react';
import './Recommend.css';

const studyStrategies = [
  {
    strategy: "Active Recall",
    article: "https://en.wikipedia.org/wiki/Testing_effect",
    description: "Test yourself rather than passively reviewing. It strengthens memory."
  },
  {
    strategy: "Pomodoro Technique",
    article: "https://en.wikipedia.org/wiki/Pomodoro_Technique",
    description: "Work in focused intervals with breaks to boost focus and prevent burnout."
  },
  {
    strategy: "Spaced Repetition",
    article: "https://en.wikipedia.org/wiki/Spaced_repetition",
    description: "Review material at increasing intervals to enhance long-term memory."
  },
  {
    strategy: "Mind Mapping",
    article: "https://en.wikipedia.org/wiki/Mind_map",
    description: "Visualize relationships between concepts for better understanding."
  },
  {
    strategy: "Feynman Technique",
    article: "https://en.wikipedia.org/wiki/Learning_by_teaching",
    description: "Explain a concept in simple terms to find and fill knowledge gaps."
  },
];

const Recommend: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<{ strategy: string; article: string, description: string } | null>(null);
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

  return (
    <div className="recommend-container">
      <h1>Study Machine</h1>
      {( 
        <button onClick={handleResetAndDraw} className={!isDrawing ? `reset-button` : `loading-button`}>
          {!isDrawing ? `Insert Coin` : `Loading...`}
        </button>
      )}
      <div className={`claw-machine ${isDrawing ? 'active' : ''}`}>
        {showClaw && <div className="claw"></div>}
        <div className="prize-box">
          {isDrawing && <div className="prize-placeholder">🤖</div>}
          {!isDrawing && selectedStrategy && (
            <div className="prize">
              <h2 className="font-bold">{selectedStrategy.strategy}</h2>
              <p className="description">{selectedStrategy.description}</p>
              <a target="_blank" rel="noopener noreferrer" href={selectedStrategy.article} className="font-sm text-sapp-leaf hover:text-sapp-green font-medium">Learn more</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
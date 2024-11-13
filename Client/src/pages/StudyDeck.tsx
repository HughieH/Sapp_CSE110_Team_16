import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './StudyDeck.css';

const StudyDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prevState) => !prevState); // Use previous state to toggle correctly
    console.log('Card flipped:', !isFlipped); // Log to check state change
  };

  return (
    <div className="study-container">
      <h1 className="deck-title">Deck {deckId}</h1>
      <div className="flashcard" onClick={toggleFlip}>
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <p>Front Side Content</p>
          </div>
          <div className="flashcard-back">
            <p>Back Side Content</p>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="study-button wrong-button">Wrong</button>
        <button className="study-button correct-button">Correct</button>
        <button className="study-button ignore-button">Ignore</button>
      </div>

      <Link to="/decks" className="go-back-link">Go Back</Link>
    </div>
  );
};

export default StudyDeck;

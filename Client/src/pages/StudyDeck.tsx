import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './StudyDeck.css';

interface Flashcard {
  id: number;
  frontContent: string;
  backContent: string;
}

interface Deck {
  id: number;
  name: string;
  cards: Flashcard[];
}

const StudyDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track the current card
  const [isFlipped, setIsFlipped] = useState(false); // Track card flip state

  // Dummy deck data (replace this with actual data)
  const deck: Deck = {
    id: parseInt(deckId || '0', 10),
    name: `Deck ${deckId}`,
    cards: [
      { id: 1, frontContent: 'Front 1', backContent: 'Back 1' },
      { id: 2, frontContent: 'Front 2', backContent: 'Back 2' },
      { id: 3, frontContent: 'Front 3', backContent: 'Back 3' },
    ],
  };

  const currentCard = deck.cards[currentCardIndex];

  // Toggle flip state on button press
  const toggleFlip = () => {
    setIsFlipped((prevState) => !prevState); // Toggle flip state
  };

  // Move to next card
  const nextCard = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1); // Move to the next card
      setIsFlipped(false); // Reset flip to front when moving to the next card
    }
  };

  // Move to previous card
  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1); // Move to the previous card
      setIsFlipped(false); // Reset flip to front when moving to the previous card
    }
  };

  return (
    <div className="study-container">
      <h1 className="deck-title">{deck.name}</h1>

      <div className="flashcard" onClick={toggleFlip}>
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <p>{currentCard.frontContent}</p>
          </div>
          <div className="flashcard-back">
            <p>{currentCard.backContent}</p>
          </div>
        </div>
      </div>

      {/* Flip Card Button */}
      <button className="flip-button" onClick={toggleFlip} data-testid="flip button">
        Flip Card
      </button>

      <div className="button-group">
        <button className="study-button wrong-button" onClick={nextCard} data-testid="wrong button">
          Wrong
        </button>
        <button className="study-button correct-button" onClick={nextCard} data-testid="correct button">
          Correct
        </button>
        <button className="study-button ignore-button" onClick={nextCard} data-testid="ignore button">
          Ignore
        </button>
      </div>

      <div className="navigation-buttons">
        <button className="study-button" onClick={previousCard} disabled={currentCardIndex === 0} data-testid="prev button">
          Previous
        </button>
        <button className="study-button" onClick={nextCard} disabled={currentCardIndex === deck.cards.length - 1} data-testid="next button">
          Next
        </button>
      </div>

      <Link to="/decks" className="go-back-link" data-testid="back button">
        Go Back
      </Link>
    </div>
  );
};

export default StudyDeck;

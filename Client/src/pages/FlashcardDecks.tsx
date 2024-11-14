import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FlashcardDecks.css';

const FlashcardDecks: React.FC = () => {
  const [decks, setDecks] = useState([
    { id: 1, name: 'Deck 1', cards: ['Card 1', 'Card 2', 'Card 3'] },
    { id: 2, name: 'Deck 2', cards: ['Card 1', 'Card 2', 'Card 3'] },
    { id: 3, name: 'Deck 3', cards: ['Card 1', 'Card 2', 'Card 3'] },
  ]);

  // Function to handle creating a new deck
  const handleCreateNewDeck = () => {
    const newDeckId = decks.length + 1; // Generate a new ID
    const newDeck = {
      id: newDeckId,
      name: `Deck ${newDeckId}`,
      cards: ['Card 1', 'Card 2', 'Card 3'], // Initialize with 3 cards
    };
    setDecks([...decks, newDeck]); // Update the state with the new deck
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="your-decks-title">Your Decks</h1>

      <div className="deck-container">
        {decks.map((deck) => (
          <div key={deck.id} className="deck-card">
            <div className="deck-preview">
              <div className="card-stack">
                {deck.cards.slice(0, 3).map((card, index) => (
                  <div key={index} className={`card ${index === 2 ? 'front-card' : ''}`}>
                    {card}
                  </div>
                ))}
              </div>
            </div>
            <div className="deck-name">{deck.name}</div>
            <div className="button-container">
              <Link to={`/edit/${deck.id}`} className="button edit-button">
                Edit
              </Link>
              <Link to={`/study/${deck.id}`} className="button study-button">
                Study
              </Link>
            </div>
          </div>
        ))}

        {/* Create New Deck Button */}
        <div className="create-new-placeholder">
          <button
            className="create-new-button"
            onClick={handleCreateNewDeck} // Updated to call the new function
          >
            +
          </button>
          <div className="create-new-text">Create New</div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDecks;
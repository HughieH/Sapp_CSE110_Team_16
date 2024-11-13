// FlashcardDecks.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './FlashcardDecks.css';

const FlashcardDecks: React.FC = () => {
  const decks = [
    { id: 1, name: 'Deck 1', cards: ['Card 1', 'Card 2', 'Card 3'] },
    { id: 2, name: 'Deck 2', cards: ['Card 1', 'Card 2', 'Card 3'] },
    { id: 3, name: 'Deck 3', cards: ['Card 1', 'Card 2', 'Card 3'] },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="your-decks-title">Your Decks</h1>

      <div className="deck-container">
        {decks.map((deck) => (
          <div key={deck.id} className="deck-card">
            <div className="deck-preview">
              <div className="card-stack">
                {deck.cards.map((card, index) => (
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
              <button
                className="button study-button"
                onClick={() => alert(`Study ${deck.name}`)}
              >
                Study
              </button>
            </div>
          </div>
        ))}

        {/* Create New Deck Placeholder */}
        <div className="create-new-placeholder">
          <button
            className="create-new-button"
            onClick={() => alert('Create a new deck')}
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

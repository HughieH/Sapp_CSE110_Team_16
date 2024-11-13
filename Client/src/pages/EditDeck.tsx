// EditDeck.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './EditDeck.css';

const EditDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();

  const flashcards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    content: `Flashcard ${i + 1}`,
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="deck-title">Deck {deckId}</h1>
      <Link to="/decks" style={{ color: '#2E7D32', fontWeight: 'bold' }}>
        Go Back
      </Link>

      <div className="flashcard-edit-container">
        {flashcards.map((card) => (
          <div key={card.id} className="flashcard">
            <div className="flashcard-content">{card.content}</div>
            <div className="flashcard-actions">
              <button
                className="edit-icon"
                onClick={() => alert(`Edit ${card.content}`)}
              >
                ✏️
              </button>
              <button
                className="delete-icon"
                onClick={() => alert(`Delete ${card.content}`)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {/* Create New Card Button */}
        <div className="flashcard create-new-card" onClick={() => alert('Create a new card')}>
          <div className="create-icon-circle">+</div>
          <div className="create-new-text">Create New</div>
        </div>
      </div>
    </div>
  );
};

export default EditDeck;

// EditDeck.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EditDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Deck {deckId}</h1>
      <Link to="/decks" style={{ color: '#2E7D32', fontWeight: 'bold' }}>
        Go Back
      </Link>
      {/* Render the flashcards here with editing functionality */}
      <div className="flashcard-edit-container">
        {/* Placeholder for flashcards */}
        <div className="flashcard">Flashcard 1</div>
        <div className="flashcard">Flashcard 2</div>
        <div className="flashcard">Flashcard 3</div>
        {/* Add editing features for each flashcard */}
      </div>
    </div>
  );
};

export default EditDeck;

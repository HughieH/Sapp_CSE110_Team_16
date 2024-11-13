// src/components/FlashcardDecks.tsx

import React from 'react';
import { FaEdit, FaBook } from 'react-icons/fa'; // Import icons
import './FlashcardDecks.css'; // Import global CSS file


const FlashcardDecks: React.FC = () => {
  const decks = [
    { id: 1, name: 'Deck 1' },
    { id: 2, name: 'Deck 2' },
    { id: 3, name: 'Deck 3' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Flashcard Decks</h1>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id} style={{ marginBottom: '20px' }}>
            <span>{deck.name}</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
              <button
                className="edit-button"
                onClick={() => alert(`Edit ${deck.name}`)}
              >
                <FaEdit size={24} />
              </button>
              <button
                className="study-button"
                onClick={() => alert(`Study ${deck.name}`)}
              >
                <FaBook size={24} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardDecks;

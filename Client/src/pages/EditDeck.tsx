import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EditDeck.css';

interface Flashcard {
  id: number;
  content: string;
}

const EditDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  // State for flashcards and deck name
  const [deckName, setDeckName] = useState(`Deck ${deckId}`);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      content: `Flashcard ${i + 1}`,
    }))
  );

  // Function to update the deck name
  const handleEditDeckName = () => {
    const newDeckName = prompt("Enter new deck name:", deckName);
    if (newDeckName) {
      setDeckName(newDeckName);
      // You might want to update the parent component or backend with this new name
    }
  };

  // Function to add a new flashcard
  const handleCreateNewCard = () => {
    const newId = flashcards.length + 1;
    const newCard = { id: newId, content: `Flashcard ${newId}` };
    setFlashcards([...flashcards, newCard]);
  };

  // Function to edit an existing flashcard
  const handleEditCard = (id: number) => {
    const newContent = prompt("Edit the content of this card:");
    if (newContent) {
      setFlashcards(flashcards.map(card => 
        card.id === id ? { ...card, content: newContent } : card
      ));
    }
  };

  // Function to delete a flashcard
  const handleDeleteCard = (id: number) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
  };

  // Function to delete the deck and navigate back to decks list
  const handleDeleteDeck = () => {
    if (window.confirm(`Are you sure you want to delete ${deckName}?`)) {
      navigate("/decks"); // Redirect back to the list of decks after deletion
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="header">
        <h1 className="deck-title">{deckName}</h1>
        <button className="edit-icon-button" onClick={handleEditDeckName}>
          ✏️
        </button>
        <button className="delete-icon-button" onClick={handleDeleteDeck}>
          🗑️
        </button>
      </div>

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
                onClick={() => handleEditCard(card.id)}
              >
                ✏️
              </button>
              <button
                className="delete-icon"
                onClick={() => handleDeleteCard(card.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {/* Create New Card Button */}
        <div className="flashcard create-new-card" onClick={handleCreateNewCard}>
          <div className="create-icon-circle">+</div>
          <div className="create-new-text">Create New</div>
        </div>
      </div>
    </div>
  );
};

export default EditDeck;

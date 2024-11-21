import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EditDeck.css';

interface Flashcard {
  id: number;
  frontContent: string;
  backContent: string;
}

const EditDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();

  // State for deck name and flashcards
  const [deckName, setDeckName] = useState(`Deck ${deckId}`);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  // Load deck data from localStorage when the component mounts
  const loadDeckData = () => {
    const savedDeckName = localStorage.getItem(`deckName-${deckId}`);
    const savedFlashcards = localStorage.getItem(`flashcards-${deckId}`);

    if (savedDeckName) {
      setDeckName(savedDeckName);
    }
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    loadDeckData();
  }, [deckId]);

  // Save data to localStorage
  const saveDeckData = () => {
    localStorage.setItem(`deckName-${deckId}`, deckName);
    localStorage.setItem(`flashcards-${deckId}`, JSON.stringify(flashcards));
  };

  // Update deck name
  const handleEditDeckName = () => {
    const newDeckName = prompt('Enter new deck name:', deckName);
    if (newDeckName) {
      setDeckName(newDeckName);
      saveDeckData();
    }
  };

  // Handle changes in flashcards (front and back content)
  const handleEditCard = (id: number, side: 'front' | 'back', newContent: string) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.id === id ? { ...card, [side === 'front' ? 'frontContent' : 'backContent']: newContent } : card
    );
    setFlashcards(updatedFlashcards);
    saveDeckData(); // Save changes to localStorage
  };

  // Handle deleting a flashcard
  const handleDeleteCard = (id: number) => {
    const updatedFlashcards = flashcards.filter((card) => card.id !== id);
    setFlashcards(updatedFlashcards);
    saveDeckData();
  };

  // Handle deck deletion
  const handleDeleteDeck = () => {
    if (window.confirm(`Are you sure you want to delete ${deckName}?`)) {
      localStorage.removeItem(`deckName-${deckId}`);
      localStorage.removeItem(`flashcards-${deckId}`);
      navigate('/decks'); // Redirect back to the decks list after deletion
    }
  };

  return (
    <div className="min-h-screen p-10">
      <div className="header">
        <h1 className="deck-title">{deckName}</h1>
        <button className="edit-icon-button" onClick={handleEditDeckName} data-testid="rename deck">
          ✏️
        </button>
        <button className="delete-icon-button" onClick={handleDeleteDeck} data-testid="delete deck">
          🗑️
        </button>
      </div>

      <Link to="/decks" style={{ color: '#2E7D32', fontWeight: 'bold' }} data-testid="back button">
        Go Back
      </Link>

      <div className="flashcard-edit-container">
        {flashcards.map((card) => (
          <div key={card.id} className="flashcard">
            <div className="flashcard-content">
              <div>
                <label>Front:</label>
                <input
                  type="text"
                  value={card.frontContent}
                  onChange={(e) => handleEditCard(card.id, 'front', e.target.value)}
                  data-testid="front-text"
                  placeholder="Enter front content"
                />
              </div>
              <div>
                <label>Back:</label>
                <input
                  type="text"
                  value={card.backContent}
                  onChange={(e) => handleEditCard(card.id, 'back', e.target.value)}
                  data-testid="back-text"
                  placeholder="Enter back content"
                />
              </div>
            </div>
            <div className="flashcard-actions">
              <button
                className="edit-icon"
                onClick={() => handleEditCard(card.id, 'front', card.frontContent)}
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

        <div className="flashcard create-new-card" onClick={() => setFlashcards([...flashcards, { id: flashcards.length + 1, frontContent: '', backContent: '' }])}>
          <div className="create-icon-circle">+</div>
          <div className="create-new-text">Create New</div>
        </div>
      </div>
    </div>
  );
};

export default EditDeck;

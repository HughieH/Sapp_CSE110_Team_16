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
    <div className="edit-deck-container">
      <header className="deck-header">
        <div className="deck-header-left">
          <h1>{deckName}</h1>
          <button className="icon-button" onClick={handleEditDeckName} data-testid="rename deck" title="Rename Deck">
            ✏️
          </button>
        </div>
        <div className="deck-header-right">
          <button className="icon-button delete" onClick={handleDeleteDeck} data-testid="delete deck" title="Delete Deck">
            🗑️
          </button>
          <Link to="/decks" className="back-button" data-testid="back button">
            Go Back
          </Link>
        </div>
      </header>
  
      <main className="flashcards-container">
        {flashcards.map((card) => (
          <div key={card.id} className="flashcard">
            <div className="flashcard-content">
              <label>
                Front:
                <textarea
                  value={card.frontContent}
                  onChange={(e) => handleEditCard(card.id, 'front', e.target.value)}
                  placeholder="Enter front content"
                  data-testid="front-text"
                />
              </label>
              <label>
                Back:
                <textarea
                  value={card.backContent}
                  onChange={(e) => handleEditCard(card.id, 'back', e.target.value)}
                  placeholder="Enter back content"
                  data-testid="back-text"
                />
              </label>
            </div>
            <div className="flashcard-actions">
              <button onClick={() => handleEditCard(card.id, 'front', card.frontContent)}>✏️ Edit</button>
              <button onClick={() => handleDeleteCard(card.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
        <div className="flashcard new-flashcard" onClick={() => setFlashcards([...flashcards, { id: flashcards.length + 1, frontContent: '', backContent: '' }])}>
          <div className="add-icon">+</div>
          <span>Add New Card</span>
        </div>
      </main>
    </div>
   );
  };  

export default EditDeck;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import './EditDeck.css';

interface Flashcard {
  id: number;
  frontContent: string;
  backContent: string;
  numCorrect: number;
}

interface Deck {
  name: string;
  cards: Flashcard[];
  userId: string;
}

const EditDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [deckName, setDeckName] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const loadDeckData = async () => {
      if (!deckId || !currentUser) return;

      try {
        const docRef = doc(db, 'decks', deckId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as Deck;
          setDeckName(data.name || `Deck ${deckId}`);
          setFlashcards(data.cards || []);
        } else {
          console.error('Deck not found');
        }
      } catch (error) {
        console.error('Error loading deck data:', error);
      }
    };

    loadDeckData();
  }, [deckId, currentUser]);

  const saveDeckData = async (updatedDeckName: string, updatedFlashcards:Flashcard[]) => {
    if (!deckId || !currentUser) return;
  
    try {
      const docRef = doc(db, 'decks', deckId);
      await setDoc(docRef, {
        name: updatedDeckName, 
        cards: updatedFlashcards,
        userId: currentUser.uid,
      });
      console.log('Deck saved successfully');
    } catch (error) {
      console.error('Error saving deck data:', error);
    }
  };

  const handleEditCard = (id: number, side: 'front' | 'back', newContent: string) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.id === id
        ? { ...card, [side === 'front' ? 'frontContent' : 'backContent']: newContent }
        : card
    );
    setFlashcards(updatedFlashcards);
  
    saveDeckData(deckName, updatedFlashcards);
  };

  const handleEditDeckName = async () => {
    const newDeckName = prompt('Enter new deck name:', deckName);
    if (newDeckName) {
      setDeckName(newDeckName);
      await saveDeckData(newDeckName, flashcards);
    }
  };


  const handleDeleteCard = (id: number) => {
    const updatedFlashcards = flashcards.filter((card) => card.id !== id);
    setFlashcards(updatedFlashcards);
    saveDeckData(deckName, updatedFlashcards);
  };

  const handleDeleteDeck = async () => {
    if (!deckId || !currentUser) return;

    if (window.confirm(`Are you sure you want to delete ${deckName}?`)) {
      try {
        await deleteDoc(doc(db, 'decks', deckId));
        navigate('/decks');
      } catch (error) {
        console.error('Error deleting deck:', error);
      }
    }
  };

  return (

    <div className="p-10 bg-white h-[calc(100vh-88px)]">
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
        <div className="flashcard create-new-card" onClick={() => setFlashcards([...flashcards, { id: flashcards.length + 1, frontContent: '', backContent: '', numCorrect: 0 }])}>
          <div className="create-icon-circle">+</div>
          <div className="create-new-text">Create New</div>
        </div>
      </main>
    </div>
   );
  };  

export default EditDeck;
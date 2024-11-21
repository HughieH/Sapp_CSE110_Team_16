import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, setDoc, getDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UserContext } from '../context/AppContext';

import './EditDeck.css';

interface Flashcard {
  id: number;
  frontContent: string;
  backContent: string;
}

const EditDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const {user, isAuthenticated} = useContext(UserContext)
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

  const loadFBDeckData = async () => {
    try {
      const deckRef = doc(db, `users/${user?.uid}/decks/${deckId}`);
      const deckSnapshot = await getDoc(deckRef);
  
      if (deckSnapshot.exists()) {
        const deckData = deckSnapshot.data();
        setDeckName(deckData.name || `Deck ${deckId}`);
        setFlashcards(deckData.flashcards || []);
      } else {
        console.error("Deck not found in Firestore");
      }
    } catch (err) {
      console.error("Error loading deck data:", err);
    }
  }


const handleFBCreateNewDeck = async () => {
  try {
    if (!user?.uid) {
      console.error("User is not authenticated");
      return;
    }

    const newDeckRef = doc(collection(db, `users/${user.uid}/decks`));
    const newDeckId = newDeckRef.id;

    const newDeck = {
      name: `New Deck ${newDeckId}`,
      flashcards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(newDeckRef, newDeck); 
    console.log("New deck created:", newDeck);

    navigate(`/edit-deck/${newDeckId}`);
  } catch (err) {
    console.error("Error creating new deck:", err);
  }
};

  // Load data when the component mounts
  useEffect(() => {
    loadFBDeckData();
  }, [deckId]);

  // Save data to localStorage
  const saveDeckData = () => {
    localStorage.setItem(`deckName-${deckId}`, deckName);
    localStorage.setItem(`flashcards-${deckId}`, JSON.stringify(flashcards));
  };

  const saveFBDeckData = async () => {
    try {
      const deckRef = doc(db, `users/${user?.uid}/decks/${deckId}`);
      await setDoc(deckRef, {
        name: deckName,
        flashcards: flashcards,
        updatedAt: new Date()
      });
      console.log("Deck data saved to Firestore");
    } catch (err) {
      console.error("Error saving deck data:", err);
    }
  };


  // Update deck name
  const handleEditDeckName = () => {
    const newDeckName = prompt('Enter new deck name:', deckName);
    if (newDeckName) {
      setDeckName(newDeckName);
      //saveDeckData();
    }
  };

  const handleFBEditDeckName = async () => {
    const newDeckName = prompt('Enter new deck name:', deckName);
  if (newDeckName) {
    setDeckName(newDeckName);
    await saveFBDeckData(); // Save the updated name to Firestore
  }
  };

  // Handle changes in flashcards (front and back content)
  const handleEditCard = (id: number, side: 'front' | 'back', newContent: string) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.id === id ? { ...card, [side === 'front' ? 'frontContent' : 'backContent']: newContent } : card
    );
    setFlashcards(updatedFlashcards);
    //saveDeckData(); // Save changes to localStorage
  };

  const handleFBEditCard = async (id: number, side: 'front' | 'back', newContent: string) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.id === id ? { ...card, [side === 'front' ? 'frontContent' : 'backContent']: newContent } : card
    );
    setFlashcards(updatedFlashcards);
    await saveFBDeckData();
  };

  // Handle deleting a flashcard
  const handleDeleteCard = (id: number) => {
    const updatedFlashcards = flashcards.filter((card) => card.id !== id);
    setFlashcards(updatedFlashcards);
    //saveDeckData();
  };

  const handleFBDeleteCard = async (id: number) => {
    const updatedFlashcards = flashcards.filter((card) => card.id !== id);
    setFlashcards(updatedFlashcards);
    await saveFBDeckData(); 
  };

  // Handle deck deletion
  const handleDeleteDeck = () => {
    if (window.confirm(`Are you sure you want to delete ${deckName}?`)) {
      localStorage.removeItem(`deckName-${deckId}`);
      localStorage.removeItem(`flashcards-${deckId}`);
      navigate('/decks'); // Redirect back to the decks list after deletion
    }
  };

  const handleFBDeleteDeck = async () => {
    if (window.confirm(`Are you sure you want to delete ${deckName}?`)) {
      try {
        await deleteDoc(doc(db, `users/${user?.uid}/decks/${deckId}`));
        console.log("Deck deleted successfully");
        navigate('/decks'); // Redirect back to the decks list after deletion
      } catch (err) {
        console.error("Error deleting deck:", err);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="header">
        <h1 className="deck-title">{deckName}</h1>
        <button className="edit-icon-button" onClick={handleFBEditDeckName} data-testid="rename deck">
          ✏️
        </button>
        <button className="delete-icon-button" onClick={handleFBDeleteDeck} data-testid="delete deck">
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
                  onChange={(e) => handleFBEditCard(card.id, 'front', e.target.value)}
                  data-testid="front-text"
                  placeholder="Enter front content"
                />
              </div>
              <div>
                <label>Back:</label>
                <input
                  type="text"
                  value={card.backContent}
                  onChange={(e) => handleFBEditCard(card.id, 'back', e.target.value)}
                  data-testid="back-text"
                  placeholder="Enter back content"
                />
              </div>
            </div>
            <div className="flashcard-actions">
              <button
                className="edit-icon"
                onClick={() => handleFBEditCard(card.id, 'front', card.frontContent)}
              >
                ✏️
              </button>
              <button
                className="delete-icon"
                onClick={() => handleFBDeleteCard(card.id)}
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

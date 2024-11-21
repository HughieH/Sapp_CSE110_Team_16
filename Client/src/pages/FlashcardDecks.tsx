import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

import './FlashcardDecks.css';

const FlashcardDecks: React.FC = () => {
  const [decks, setDecks] = useState<{ id: string; name: string; cards: string[] }[]>([]);
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate(); // Initialize useNavigate


  useEffect(() => {
    const fetchDecks = async () => {
      if (!userId) return; // Ensure a user is logged in

      const userDecksRef = collection(db, `users/${userId}/decks`);
      try {
        const snapshot = await getDocs(userDecksRef);
        const fetchedDecks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as { id: string; name: string; cards: string[] }[];
        setDecks(fetchedDecks);
      } catch (err) {
        console.error("Error fetching decks:", err);
      }
    };

    fetchDecks();
  }, [userId]);

  const handleCreateNewDeck = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const newDeck = {
      name: `Deck ${decks.length + 1}`,
      cards: [],
      createdAt: new Date(),
    };

    try {
      const userDecksRef = collection(db, `users/${userId}/decks`);
      const docRef = await addDoc(userDecksRef, newDeck);
      setDecks([...decks, { id: docRef.id, ...newDeck }]);
      console.log("New deck created:", docRef.id);
      navigate(`/edit/${docRef.id}`);
    } catch (err) {
      console.error("Error creating new deck:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="your-decks-title">Your Decks</h1>

      <div className="deck-container">
        {/* Only display decks if there are any */}
        {decks.length > 0 &&
          decks.map((deck) => (
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
          <button className="create-new-button" onClick={handleCreateNewDeck}>
            +
          </button>
          <div className="create-new-text">Create New</div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDecks;

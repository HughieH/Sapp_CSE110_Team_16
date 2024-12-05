import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import './FlashcardDecks.css';

type Card = {
  id: string;
  frontContent: string;
  backContent: string;
};

type Deck = {
  id: string;
  name: string;
  cards: Card[]; 
};


const FlashcardDecks: React.FC = () => {
  const [decks, setDecks] = useState<Deck[] | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchDecks = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, 'decks'),
        where('userId', '==', currentUser.uid) 
      );
      const querySnapshot = await getDocs(q);
      const fetchedDecks: Deck[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Deck, 'id'>),
      }));
      setDecks(fetchedDecks);
    } catch (error) {
      console.error('Error fetching decks:', error);
      setDecks([]); 
    }
  };

  useEffect(() => {
    fetchDecks();
  }, [currentUser, location]); 
  const handleStudyDeck = (deckId: string) => {
    const deckref = doc(db, "decks", deckId);
    updateDoc(deckref, {
      timesStudied: increment(1),
    });
    navigate(`/study/${deckId}`);
  };

  const handleCreateNewDeck = async () => {
    if (!currentUser) {
      console.error('No user logged in. Cannot create a deck.');
      return;
    }

    const newDeck = {
      name: `Deck ${decks?.length ? decks.length + 1 : 1}`,
      cards: [],
      userId: currentUser.uid,
      timesStudied: 0
    };

    try {
      const docRef = await addDoc(collection(db, 'decks'), newDeck);
      const createdDeck = { id: docRef.id, ...newDeck };
      setDecks((prevDecks) => (prevDecks ? [...prevDecks, createdDeck] : [createdDeck]));
    } catch (error) {
      console.error('Error creating new deck:', error);
    }
  };

  const handleEditDeck = (deckId: string) => {
    navigate(`/edit/${deckId}`);
  };

  if (!currentUser) {
    return <p>Please log in to view your decks.</p>;
  }

  if (decks === null) {
    return <p className="bg-white h-screen">Loading...</p>;
  }

  return (

    <div data-testid="Decks" className="bg-white h-[calc(100vh-88px)]">
      <h1 className="your-decks-title pl-10">Your Decks</h1>

      <div className="deck-container">
        {decks.length > 0 &&
          decks.map((deck) => (
            <div key={deck.id} className="deck-card">
              <div className="deck-preview">
                <div className="card-stack">
                  {deck.cards.slice(0, 3).map((card, index) => (
                    <div key={card.id} className={`card ${index === 2 ? 'front-card' : ''}`}>
                      {card.frontContent}
                    </div>
                  ))}
                </div>
              </div>
              <div className="deck-name">{deck.name}</div>
              <div className="button-container">
                <button
                  className="button edit-button"
                  onClick={() => handleEditDeck(deck.id)}
                >
                  Edit
                </button>
                <button className="button study-button" onClick={()=>handleStudyDeck(deck.id)}>Study</button>
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

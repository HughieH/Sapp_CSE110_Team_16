import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './StudyDeck.css';

type Flashcard = {
  id: string;
  frontContent: string;
  backContent: string;
  numCorrect: number;
};

type Deck = {
  id: string;
  name: string;
  cards: Flashcard[];
};

const StudyDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;

      try {
        const docRef = doc(db, 'decks', deckId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setDeck({ id: deckId, ...(docSnapshot.data() as Omit<Deck, 'id'>) });
        } else {
          console.error('Deck not found');
        }
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const currentCard = deck?.cards[currentCardIndex];

  const toggleFlip = () => setIsFlipped((prevState) => !prevState);

  const correctAnswer = async (cardId: number) => {
    const deckRef = doc(db, "decks", deckId as string);
    const deckSnap = await getDoc(deckRef);

    // Cast the document data to Deck type
    const deckData = deckSnap.data() as Deck;
    const cards = deckData.cards;

    // Update numCorrect for the specific card
    const updatedCards = cards.map((card) =>
      Number(card.id) === cardId
        ? { ...card, numCorrect: (card.numCorrect || 0) + 1 }
        : card
    );
    await updateDoc(deckRef, { cards: updatedCards });
    nextCard();
  };

  const nextCard = () => {
    if (currentCardIndex < (deck?.cards.length || 0) - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    } else {
      navigate('/decks');
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
      setIsFlipped(false);
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div className="study-container">
      <h1 className="deck-title">{deck.name}</h1>

      {currentCard ? (
        <div className="flashcard" onClick={toggleFlip}>
          <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
            <div className="flashcard-front">
              <p>{currentCard.frontContent}</p>
            </div>
            <div className="flashcard-back">
              <p>{currentCard.backContent}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No cards available.</p>
      )}

<div className="button-group">
        <button className="study-button wrong-button" onClick={nextCard} data-testid="wrong button">
          Wrong
        </button>
        <button className="study-button correct-button" onClick={() => correctAnswer(currentCardIndex)} data-testid="correct button">
          Correct
        </button>
        <button className="study-button ignore-button" onClick={nextCard} data-testid="ignore button">
          Ignore
        </button>
      </div>

      <div className="navigation-buttons">
        <button className="study-button" onClick={previousCard} disabled={currentCardIndex === 0}>
          Previous
        </button>
        <button
          className="study-button"
          onClick={nextCard}
          disabled={currentCardIndex === (deck?.cards.length || 0) - 1 && !currentCard}
        >
          Next
        </button>
      </div>

      <Link to="/decks" className="go-back-link">
        Go Back
      </Link>
    </div>
  );
};

export default StudyDeck;

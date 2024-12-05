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
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [isCompleted, setIsCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;

      try {
        const docRef = doc(db, 'decks', deckId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as Omit<Deck, 'id'>;
          setDeck({ id: deckId, name: data.name, cards: data.cards || [] });
          setStats((prev) => ({ ...prev, total: data.cards.length }));
        } else {
          console.error('Deck not found');
        }
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const toggleFlip = () => setIsFlipped((prevState) => !prevState);

  const nextCard = () => {
    if (deck && currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    } else {
      setIsCompleted(true);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleAnswer = async (isCorrect: boolean) => {
    if (!deck) return;

    setStats((prevStats) => ({
      ...prevStats,
      correct: isCorrect ? prevStats.correct + 1 : prevStats.correct,
      incorrect: !isCorrect ? prevStats.incorrect + 1 : prevStats.incorrect,
    }));

    const currentCard = deck.cards[currentCardIndex];
    const updatedCard = {
      ...currentCard,
      numCorrect: isCorrect ? currentCard.numCorrect + 1 : 0,
    };

    const updatedCards = [
      ...deck.cards.slice(0, currentCardIndex),
      updatedCard,
      ...deck.cards.slice(currentCardIndex + 1),
    ];

    try {
      await updateDoc(doc(db, 'decks', deckId as string), { cards: updatedCards });
      setDeck({ ...deck, cards: updatedCards });
      nextCard();
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const sortCards = () => {
    if (!deck) return;
    const sortedCards = [...deck.cards].sort((a, b) => a.numCorrect - b.numCorrect);
    setDeck({ ...deck, cards: sortedCards });
    setCurrentCardIndex(0); // Restart from the first card
  };

  if (isCompleted) {
    const successRate = Math.round((stats.correct / stats.total) * 100);
    return (
      <div className="completion-screen">
        <h1>You’ve finished studying the deck!</h1>
        <p>Success Rate: {successRate}%</p>
        <button onClick={() => setIsCompleted(false)}>Restudy Deck</button>
        <Link to="/decks">Exit to Decks</Link>
      </div>
    );
  }

  if (!deck || deck.cards.length === 0) {
    return <p>Loading or no cards available for review at the moment. Check back later!</p>;
  }

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div className="study-container">
      <h1 className="deck-title">{deck.name}</h1>
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
  
      <div className="button-group">
        <button className="study-button wrong-button" onClick={() => handleAnswer(false)}>
          Wrong
        </button>
        <button className="study-button correct-button" onClick={() => handleAnswer(true)}>
          Correct
        </button>
      </div>
  
      <div className="navigation-buttons">
        <button className="study-button previous-button" onClick={previousCard} disabled={currentCardIndex === 0}>
          Previous
        </button>
        <button
          className="study-button next-button"
          onClick={nextCard}
          disabled={currentCardIndex === deck.cards.length - 1}
        >
          Next
        </button>
      </div>
  
      <button className="spaced-repetition-button" onClick={sortCards}>
        Sort by Spaced Repetition
      </button>
  
      <div className="statistics-container">
        <p className="stat">Total: {stats.total}</p>
        <p className="stat">Correct: {stats.correct}</p>
        <p className="stat">Incorrect: {stats.incorrect}</p>
      </div>
  
      <Link to="/decks" className="go-back-link">
        Go Back
      </Link>
    </div>
  );
}  

export default StudyDeck;

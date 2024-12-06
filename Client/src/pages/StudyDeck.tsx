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
    document.body.style.overflow = 'hidden'; // Disable scrolling
    return () => {
      document.body.style.overflow = ''; // Re-enable scrolling when component unmounts
    };
  }, []);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;

      try {
        const docRef = doc(db, 'decks', deckId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as Omit<Deck, 'id'>;
          const shuffledCards = shuffleDeck(data.cards); // Shuffle after fetch
          setDeck({ id: deckId, name: data.name, cards: shuffledCards });
          setStats((prev) => ({ ...prev, total: shuffledCards.length }));
        } else {
          console.error('Deck not found');
        }
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, [deckId]);

  // Function to shuffle the cards
  const shuffleDeck = (cards: Flashcard[]) => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
  };

  const shuffleCards = () => {
    if (!deck) return;

    const shuffledCards = shuffleDeck(deck.cards);
    setDeck({ ...deck, cards: shuffledCards });
    setCurrentCardIndex(0); // Reset to the first card
    setStats({ correct: 0, incorrect: 0, total: deck.cards.length }); // Reset counters
  };

  const sortCards = () => {
    if (!deck) return;

    const sortedCards = [...deck.cards].sort((a, b) => a.numCorrect - b.numCorrect);
    setDeck({ ...deck, cards: sortedCards });
    setCurrentCardIndex(0); // Reset to the first card
    setStats({ correct: 0, incorrect: 0, total: deck.cards.length }); // Reset counters
  };

  const toggleFlip = () => setIsFlipped((prevState) => !prevState);

  const nextCard = () => {
    if (deck && currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    } else {
      setIsCompleted(true);
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

  const resetStudy = () => {
    setStats({ correct: 0, incorrect: 0, total: deck?.cards.length || 0 });
    setCurrentCardIndex(0); // Reset to the first card
    setIsCompleted(false); // Close the completion screen if it's open
  };

  if (isCompleted) {
    const successRate = Math.round((stats.correct / stats.total) * 100);
    return (
      <div className="completion-screen">
        <h1>You’ve finished studying the deck!</h1>
        <p>Success Rate: {successRate}%</p>
        <button onClick={resetStudy}>Restudy Deck</button>
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

      <div className="statistics-container">
        <p className="stat">
          Card: {currentCardIndex + 1} of {deck.cards.length}
        </p>
        <p className="stat">Correct: {stats.correct}</p>
        <p className="stat">Incorrect: {stats.incorrect}</p>
      </div>

      <button className="shuffle-button" onClick={shuffleCards}>
        Shuffle Cards
      </button>

      <button className="spaced-repetition-button" onClick={sortCards}>
        Sort by Spaced Repetition
      </button>

      <Link to="/decks" className="go-back-link">
        Go Back
      </Link>
    </div>
  );
};

export default StudyDeck;

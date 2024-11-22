import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Close, NotInterested, Refresh, Shuffle, Replay } from '@mui/icons-material'; // Material UI Icons
import "./StudyDeck.css";

interface Flashcard {
  id: number;
  frontContent: string;
  backContent: string;
}

interface Deck {
  id: number;
  name: string;
  cards: Flashcard[];
}

const StudyDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deckCards, setDeckCards] = useState<Flashcard[]>([
    { id: 1, frontContent: "Front 1", backContent: "Back 1" },
    { id: 2, frontContent: "Front 2", backContent: "Back 2" },
    { id: 3, frontContent: "Front 3", backContent: "Back 3" },
    { id: 4, frontContent: "Front 4", backContent: "Back 4" },
    { id: 5, frontContent: "Front 5", backContent: "Back 5" },
    { id: 6, frontContent: "Front 6", backContent: "Back 6" },
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ wrong: 0, correct: 0, ignore: 0 });
  const [incorrectCards, setIncorrectCards] = useState<Flashcard[]>([]);
  const [deckCompleted, setDeckCompleted] = useState(false);

  const currentCard = deckCards[currentCardIndex];

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  const markCard = (action: "wrong" | "correct" | "ignore") => {
    if (currentCardIndex >= deckCards.length) return;

    setStats((prevStats) => ({ ...prevStats, [action]: prevStats[action] + 1 }));

    if (action === "wrong") {
      setIncorrectCards((prev) => [...prev, currentCard]);
    }

    if (currentCardIndex < deckCards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    } else {
      setDeckCompleted(true);
    }

    setIsFlipped(false);
  };

  const shuffleDeck = () => {
    const shuffled = [...deckCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDeckCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setDeckCompleted(false);
    setStats({ wrong: 0, correct: 0, ignore: 0 });
    setIncorrectCards([]);
  };

  const reviewIncorrect = () => {
    if (incorrectCards.length > 0) {
      setDeckCards(incorrectCards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setDeckCompleted(false);
      setStats({ wrong: 0, correct: 0, ignore: 0 });
      setIncorrectCards([]);
    }
  };

  const restudyDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setDeckCompleted(false);
    setStats({ wrong: 0, correct: 0, ignore: 0 });
    setIncorrectCards([]);
  };

  return (
    <div className="study-container">
      <h1 className="deck-title">Deck {deckId}</h1>

      {deckCompleted ? (
        <div className="deck-completed">
          <h2 className="deck-completed-message">🎉 You've finished the deck! 🎉</h2>
          <div className="completion-actions">
            <button className="action-button restudy-button" onClick={restudyDeck}>
              <Replay />
              Restudy Deck
            </button>
            <Link to="/decks" className="action-button exit-button">
              Exit to Decks
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="progress">
            <p>
              Card {currentCardIndex + 1} / {deckCards.length}
            </p>
          </div>

          <div className="flashcard" onClick={toggleFlip}>
            <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
              <div className="flashcard-front">
                <p>{currentCard.frontContent}</p>
              </div>
              <div className="flashcard-back">
                <p>{currentCard.backContent}</p>
              </div>
            </div>
          </div>

          <div className="counter-container">
            <span className="counter">
              <Close fontSize="small" /> {stats.wrong}
            </span>
            <span className="counter">
              <CheckCircle fontSize="small" /> {stats.correct}
            </span>
            <span className="counter">
              <NotInterested fontSize="small" /> {stats.ignore}
            </span>
          </div>

          <div className="button-group">
            <button className="study-button wrong-button" onClick={() => markCard("wrong")}>
              <Close fontSize="large" />
            </button>
            <button className="study-button correct-button" onClick={() => markCard("correct")}>
              <CheckCircle fontSize="large" />
            </button>
            <button className="study-button ignore-button" onClick={() => markCard("ignore")}>
              <NotInterested fontSize="large" />
            </button>
          </div>

          <div className="actions">
            <button className="action-button shuffle-button" onClick={shuffleDeck}>
              <Shuffle fontSize="large" />
            </button>
            {incorrectCards.length > 0 && (
              <button className="action-button review-button" onClick={reviewIncorrect}>
                <Refresh fontSize="large" />
                Review Incorrect Cards
              </button>
            )}
          </div>
        </>
      )}

      <Link to="/decks" className="go-back-link">
        Go Back
      </Link>
    </div>
  );
};

export default StudyDeck;

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Close, NotInterested, Replay } from "@mui/icons-material";
import "./StudyDeck.css";

interface Flashcard {
  id: number;
  frontContent: string;
  backContent: string;
}

const StudyDeck: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deckCards, setDeckCards] = useState<Flashcard[]>([
    { id: 1, frontContent: "What is the capital of France?", backContent: "Paris" },
    { id: 2, frontContent: "What is 2 + 2?", backContent: "4" },
    { id: 3, frontContent: "What is the largest planet in the solar system?", backContent: "Jupiter" },
    { id: 4, frontContent: "Who wrote 'To Kill a Mockingbird'?", backContent: "Harper Lee" },
    { id: 5, frontContent: "What is the boiling point of water in Celsius?", backContent: "100°C" },
    { id: 6, frontContent: "Who painted the Mona Lisa?", backContent: "Leonardo da Vinci" },
    { id: 7, frontContent: "What is the chemical symbol for gold?", backContent: "Au" },
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
    setDeckCards([
      { id: 1, frontContent: "What is the capital of France?", backContent: "Paris" },
      { id: 2, frontContent: "What is 2 + 2?", backContent: "4" },
      { id: 3, frontContent: "What is the largest planet in the solar system?", backContent: "Jupiter" },
      { id: 4, frontContent: "Who wrote 'To Kill a Mockingbird'?", backContent: "Harper Lee" },
      { id: 5, frontContent: "What is the boiling point of water in Celsius?", backContent: "100°C" },
      { id: 6, frontContent: "Who painted the Mona Lisa?", backContent: "Leonardo da Vinci" },
      { id: 7, frontContent: "What is the chemical symbol for gold?", backContent: "Au" },
    ]);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setDeckCompleted(false);
    setStats({ wrong: 0, correct: 0, ignore: 0 });
    setIncorrectCards([]);
  };

  const successPercentage = (stats.correct / deckCards.length) * 100;

  return (
    <div className="study-container">
      <aside className="stats-sidebar">
        <h2>Statistics</h2>
        <p>
          <CheckCircle /> Correct: {stats.correct}
        </p>
        <p>
          <Close /> Wrong: {stats.wrong}
        </p>
        <p>
          <NotInterested /> Ignored: {stats.ignore}
        </p>
        <p>Card: {currentCardIndex + 1} / {deckCards.length}</p>
      </aside>

      <div className="study-content">
        <h1 className="deck-title">Deck {deckId}</h1>

        {deckCompleted ? (
          <div className="deck-completed">
            <h2 className="deck-completed-message">🎉 You've finished the deck! 🎉</h2>
            <p>Success: {successPercentage.toFixed(2)}%</p>
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
                Shuffle Deck
              </button>
              {incorrectCards.length > 0 && (
                <button className="action-button review-button" onClick={reviewIncorrect}>
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
    </div>
  );
};

export default StudyDeck;

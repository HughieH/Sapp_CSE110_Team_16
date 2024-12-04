  import React, { useState, useEffect } from "react";
  import { useParams, Link } from "react-router-dom";
  import { CheckCircle, Close, NotInterested, Replay } from "@mui/icons-material";
  import "./StudyDeck.css";

  interface Flashcard {
    id: number;
    frontContent: string;
    backContent: string;
    easinessFactor: number; // For spaced repetition algorithm
    interval: number; // Review interval in days
    nextReviewDate: Date; // When to review the card next
  }

  const StudyDeck: React.FC = () => {
    const { deckId } = useParams<{ deckId: string }>();
    const [deckCards, setDeckCards] = useState<Flashcard[]>([
      {
        id: 1,
        frontContent: "What is the capital of France?",
        backContent: "Paris",
        easinessFactor: 2.5,
        interval: 0,
        nextReviewDate: new Date(),
      },  
      {
        id: 2,
        frontContent: "What is 2 + 2?",
        backContent: "4",
        easinessFactor: 2.5,
        interval: 0,
        nextReviewDate: new Date(),
      },  
      {
        id: 3,
        frontContent: "What is the largest planet in the solar system?",
        backContent: "Jupiter",
        easinessFactor: 2.5,
        interval: 0,
        nextReviewDate: new Date(),
      },  
      {
        id: 4,
        frontContent: "Who wrote 'To Kill a Mockingbird'?",
        backContent: "Harper Lee",
        easinessFactor: 2.5,
        interval: 0,
        nextReviewDate: new Date(),
      },  
      {
        id: 5,
        frontContent: "What is the boiling point of water in Celsius?",
        backContent: "100°C",
        easinessFactor: 2.5,
        interval: 0,
        nextReviewDate: new Date(),
      },  
      {
        id: 6,
        frontContent: "Who painted the Mona Lisa?",
        backContent: "Leonardo da Vinci",
        easinessFactor: 2.5,
        interval: 0,
        nextReviewDate: new Date(),
      },  
      {
        id: 7,
        frontContent: "What is the chemical symbol for gold?",
        backContent: "Au",
        easinessFactor: 2.5,
        interval: 0,
        nextReviewDate: new Date(),
      },  
    ]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = deckCards[currentCardIndex];

    const [stats, setStats] = useState({ wrong: 0, correct: 0, ignore: 0 });
    const [incorrectCards, setIncorrectCards] = useState<Flashcard[]>([]);
    const [deckCompleted, setDeckCompleted] = useState(false);

    const toggleFlip = () => setIsFlipped((prev) => !prev);

    // UpdateCard Fix
    const updateCard = (score: number) => {
      const now = new Date();
      const updatedDeck = [...deckCards];
      const card = updatedDeck[currentCardIndex];

      // Adjust easiness factor (EF)
      const newEF = Math.max(
        1.3,
        card.easinessFactor + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02))
      );

      // Calculate new interval
      const newInterval =
        score >= 3
          ? card.interval === 0
            ? 1 // First correct answer
            : card.interval * newEF
          : 0; // Immediate review for low scores

      // Update card details
      card.easinessFactor = newEF;
      card.interval = newInterval;
      card.nextReviewDate =
        newInterval > 0
          ? new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000)
          : now;

      updatedDeck[currentCardIndex] = card;

      // Sort deck by review date
      const sortedDeck = updatedDeck.sort(
        (a, b) => a.nextReviewDate.getTime() - b.nextReviewDate.getTime()
      );

      setDeckCards(sortedDeck);
      setCurrentCardIndex((prev) =>
        prev < sortedDeck.length - 1 ? prev + 1 : prev
      );
    };

    // Fix for markCard
    const markCard = (action: "wrong" | "correct" | "ignore") => {
      if (deckCompleted) return;
    
      setStats((prevStats) => ({
        ...prevStats,
        [action]: prevStats[action] + 1,
      }));
    
      if (action === "wrong") {
        setIncorrectCards((prev) => [...prev, currentCard]);
        updateCard(1); // Low score for wrong
      } else if (action === "correct") {
        updateCard(5); // High score for correct
      }
    
      if (currentCardIndex >= deckCards.length - 1) {
        setDeckCompleted(true);
      } else {
        setCurrentCardIndex((prev) => prev + 1);
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
        {
          id: 1,
          frontContent: "What is the capital of France?",
          backContent: "Paris",
          easinessFactor: 2.5,
          interval: 0,
          nextReviewDate: new Date(),
        },  
        {
          id: 2,
          frontContent: "What is 2 + 2?",
          backContent: "4",
          easinessFactor: 2.5,
          interval: 0,
          nextReviewDate: new Date(),
        },  
        {
          id: 3,
          frontContent: "What is the largest planet in the solar system?",
          backContent: "Jupiter",
          easinessFactor: 2.5,
          interval: 0,
          nextReviewDate: new Date(),
        },  
        {
          id: 4,
          frontContent: "Who wrote 'To Kill a Mockingbird'?",
          backContent: "Harper Lee",
          easinessFactor: 2.5,
          interval: 0,
          nextReviewDate: new Date(),
        },  
        {
          id: 5,
          frontContent: "What is the boiling point of water in Celsius?",
          backContent: "100°C",
          easinessFactor: 2.5,
          interval: 0,
          nextReviewDate: new Date(),
        },  
        {
          id: 6,
          frontContent: "Who painted the Mona Lisa?",
          backContent: "Leonardo da Vinci",
          easinessFactor: 2.5,
          interval: 0,
          nextReviewDate: new Date(),
        },  
        {
          id: 7,
          frontContent: "What is the chemical symbol for gold?",
          backContent: "Au",
          easinessFactor: 2.5,
          interval: 0,
          nextReviewDate: new Date(),
        },  
      ]);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setDeckCompleted(false);
      setStats({ wrong: 0, correct: 0, ignore: 0 });
      setIncorrectCards([]);
    };

    const successPercentage =
    stats.correct + stats.wrong > 0
      ? (stats.correct / (stats.correct + stats.wrong)) * 100
      : 0;


  useEffect(() => {
    // Sort cards by next review date when deck is loaded
    setDeckCards((prevCards) =>
      [...prevCards].sort((a, b) => a.nextReviewDate.getTime() - b.nextReviewDate.getTime())
  );

  }, []);

  // Add debug info to the sidebar
  const debugInfo = (
    <div className="debug-panel">
      <h3>Debug Info</h3>
      {deckCards.map((card) => (
        <div key={card.id}>
          <p><strong>Card:</strong> {card.frontContent}</p>
          <p>Easiness Factor: {card.easinessFactor.toFixed(2)}</p>
          <p>Interval: {card.interval} days</p>
          <p>Next Review: {card.nextReviewDate.toISOString()}</p>
        </div>
      ))}
    </div>
  );

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

          {/* Debug Panel */}
      {debugInfo}
      
          <Link to="/decks" className="go-back-link">
            Go Back
          </Link>
        </div>
      </div>
    );
  };

  export default StudyDeck;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Timer from './pages/Timer';
import FlashcardDecks from './pages/FlashcardDecks';
import EditDeck from './pages/EditDeck';
import StudyDeck from './pages/StudyDeck';
import { UserProvider } from './context/AppContext';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/timers" element={<Timer />} />
        <Route path="/decks" element={<FlashcardDecks />} />
        <Route path="/edit/:deckId" element={<EditDeck />} />
        <Route path="/study/:deckId" element={<StudyDeck />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

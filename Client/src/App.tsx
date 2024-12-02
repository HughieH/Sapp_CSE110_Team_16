import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Timer from './pages/Timer';

import Profile from './pages/Profile';
import Decks from './pages/Decks';

import FlashcardDecks from './pages/FlashcardDecks';
import EditDeck from './pages/EditDeck';
import StudyDeck from './pages/StudyDeck';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  useEffect(() => {
    return () => {
      signOut(auth)
        .then(() => {
          console.log('User signed out successfully');
        })
        .catch((error) => {
          console.error('Error signing out user:', error);
        });
    };
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/timers" element={<Timer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/decks" element={<FlashcardDecks />} />
        <Route path="/edit/:deckId" element={<EditDeck />} />
        <Route path="/study/:deckId" element={<StudyDeck />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Timer from './pages/Timer';
import FlashcardDecks from './pages/FlashcardDecks';

function App() {
  return (
      <Routes>
        <Route path="/" element={<FlashcardDecks />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/timers" element={<Timer />} />
      </Routes>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Timer from './pages/Timer';
import Profile from './pages/Profile';
import Decks from './pages/Decks';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/timers" element={<Timer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/decks" element={<Decks/>} />
      </Routes>
  );
}

export default App;

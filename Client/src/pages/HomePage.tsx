import React from 'react';
import SappLogo from '../assets/SappLogo.png'
import BookIcon from '../assets/book-icon-homepage.png'
import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="flex items-center mb-2">
        <h1 className="text-8xl font-bold text-green-600 mr-2">SAPP</h1>
        <img src={BookIcon} alt="Book Icon" className="w-16 h-16" />
      </div>
      <p className="text-xl italic text-green-500 mb-6"> the best study pal in the world... </p>
      <div className="mb-6">
        <div className="bg-gray-100 rounded-full flex items-center justify-center">
          {/* Replace the placeholder below with your actual logo */}
          <img
            src={SappLogo}
            alt="SAPP Logo"
            className="w-72 h-72"
          />
        </div>
      </div>
      
      {/* Our Login & Register Button */}
      <div className="flex flex-col gap-4">
        <button onClick={handleLoginClick} className="w-48 py-2 text-white font-bold bg-green-600 rounded hover:bg-green-700 transition duration-300">
          Log In
        </button>
        <button onClick={handleRegisterClick} className="w-48 py-2 text-white font-bold bg-green-600 rounded hover:bg-green-700 transition duration-300">
          Create Account
        </button>
      </div>

    </div>
  );
};

export default HomePage;
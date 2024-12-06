import React from 'react';
import SappLogoGreen from '../assets/icons/sapp logo green.png';
import BookIcon from '../assets/icons/book-icon-homepage.png';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleRecommendClick = () => {
    navigate('/recommend'); // Redirect to /recommend
  };

  return (
    <>
      <div data-testid="Home" className={`grow flex flex-col items-center justify-center bg-white text-center h-${currentUser ? '[calc(100vh-88px)]' : 'screen'}`}>
        <div className="flex items-center mb-2">
          <h1 className="text-8xl font-bold text-green-600 mr-2">SAPP</h1>
          <img src={BookIcon} alt="Book Icon" className="w-16 h-16" />
        </div>
        <p className="text-xl italic text-green-500 mb-6"> the best study pal in the world... </p>
        <div className="mb-6">
          <div className="bg-white rounded-full flex items-center justify-center">
            {/* Replace the placeholder below with your actual logo */}
            <img
              src={SappLogoGreen}
              alt="SAPP Logo"
              className="w-72 h-72"
            />
          </div>
        </div>

        {!currentUser ? (
          <div className="flex flex-col gap-4">
            <Link data-testid="LoginButton" to='/login'>
              <button className="w-48 py-2 text-white font-bold bg-green-600 rounded hover:bg-green-700 transition duration-300">
                Log In
              </button>
            </Link>
            <Link data-testid="RegisterButton" to='/register'>
              <button className="w-48 py-2 text-white font-bold bg-green-600 rounded hover:bg-green-700 transition duration-300">
                Create Account
              </button>
            </Link>
          </div>
        ) : (
          <button 
            onClick={handleRecommendClick}
            className="w-48 py-2 text-white font-bold bg-green-600 rounded hover:bg-green-700 transition duration-300"
          >
            Recommend
          </button>
        )}
      </div>
    </>
  );
};

export default HomePage;

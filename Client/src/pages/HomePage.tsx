import React from 'react';
import SappLogo from '../assets/icons/SappLogo.png'
import BookIcon from '../assets/icons/book-icon-homepage.png'

import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
    <div data-testid="Home" className="grow flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="flex items-center mb-2">
        <h1 className="text-4xl font-bold text-green-600 mr-2">SAPP</h1>
        <img src={BookIcon} alt="Book Icon" className="w-8 h-8" />
      </div>
      <p className="text-lg italic text-green-400 mb-6">the best study pal in the world...</p>
      <div className="mb-6">
        <div className="w-36 h-36 bg-green-100 rounded-full flex items-center justify-center">
          {/* Replace the placeholder below with your actual logo */}
          <img
            src={SappLogo}
            alt="SAPP Logo"
            className=""
          />
        </div>
      </div>
      
      {/* Our Login & Register Button */}
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
    </div>
    </>
  );
};

export default HomePage;
import React from 'react';
import SappLogo from '../assets/icons/SappLogo.png'
import BookIcon from '../assets/icons/book-icon-homepage.png'

import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <>
    <div data-testid="Home" className="grow flex flex-col items-center justify-center h-[calc(100vh-88px)] bg-white text-center">
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
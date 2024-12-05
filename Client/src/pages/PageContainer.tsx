import React from 'react';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext'; 
import { getAuth, signOut } from "firebase/auth";

import App from '../App'
import Toolbar from '../components/Toolbar'
import Navbar from '../components/Navbar'

const PageContainer: React.FC = () => {
    const [message, setMessage] = useState(true);
    const { currentUser } = useAuth();

    console.log("USER: ", currentUser)

    // Function to be called from the child component
    const handleCollapseClick = () => {
      console.log('Button in child component clicked!');
      setMessage(!message)
      console.log(message)
    };

    const handleLogout = async () => {
        const auth = getAuth(); // Get the auth instance
        try {
            await signOut(auth); // Sign out the user
            console.log("User signed out successfully");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
  
    return (
        <div className="grid grid-cols-[auto_1fr] h-screen">
          {currentUser && message && (<Navbar />)}
          <div className="grid grid-rows-[auto_1fr] w-screen overflow-y-auto">
            {currentUser && (<Toolbar onCollapseClick={handleCollapseClick} navbarOpen={message} onLogoutClick={handleLogout}/>)}
            <div className={!message ? "overflow-y-auto" : `overflow-y-auto ${currentUser ? 'mr-20' : ''}`}>
              <App/>
            </div>
          </div>
        </div>
  );
};

export default PageContainer;

/*
      <div className="grid grid-cols-[auto_1fr] h-screen">
      {message && (<Navbar />)}
        <div className="grid grid-rows-[auto_1fr]">
          <Toolbar onButtonClick={handleButtonClick}/>
          <App />        
        </div>
      </div>
*/
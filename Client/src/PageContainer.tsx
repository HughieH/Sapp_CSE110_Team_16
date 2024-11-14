import React, { useState } from 'react';
import CollapseIcon from '../assets/icons/navbar collapser.png'

import App from './App'
import Toolbar from './components/Toolbar'
import Navbar from './components/Navbar'

interface toolbarProps {
    onButtonClick: () => void;
}

const PageContainer = () => {
    const [message, setMessage] = useState(true);

    // Function to be called from the child component
    const handleButtonClick = () => {
      console.log('Button in child component clicked!');
      setMessage(!message)
      console.log(message)
    };
  
    return (
    <>
        {message && (<Navbar />)}
        <div className="grow">
            <Toolbar onButtonClick={handleButtonClick}/>
            <App />        
        </div>
    </>
  );
};

export default PageContainer;
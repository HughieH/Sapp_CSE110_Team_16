import { useState } from 'react';
import { useAuth } from "./context/AuthContext";

import App from './App'
import Toolbar from './components/Toolbar'
import Navbar from './components/Navbar'

const PageContainer = () => {
    const [message, setMessage] = useState(true);
    const { currentUser } = useAuth();

    // Function to be called from the child component
    const handleButtonClick = () => {
      console.log('Button in child component clicked!');
      setMessage(!message)
      console.log(message)
    };
  
    return (
      <div className="grid grid-cols-[auto_1fr] h-screen">
        {message && (<Navbar />)}
        <div className="grid grid-rows-[auto_1fr] w-screen overflow-y-auto">
          <Toolbar onButtonClick={handleButtonClick}/>
          <div className={message == false ? "overflow-y-auto" : 'overflow-y-auto mr-20'}>
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
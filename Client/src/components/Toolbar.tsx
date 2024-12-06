import React from 'react';
import CollapseIcon from '../assets/icons/navbar collapser.png'
import LogoutIcon from '../assets/icons/logout.png'
import CollapseIconGreen from '../assets/icons/navbar collapser green.png'

import { useLocation } from 'react-router-dom';

interface toolbarProps {
    onCollapseClick: () => void;
    onLogoutClick: () => void;
    navbarOpen: boolean;
}

const Toolbar: React.FC<toolbarProps> = ({ onCollapseClick, navbarOpen, onLogoutClick }) => {
  const location = useLocation();
  console.log(location.pathname)

  var bgColorScheme = "sapp-green"
  var schemeIsGreen = true

  switch(location.pathname) {
    case "/login":
      bgColorScheme = "white"
      schemeIsGreen = false
      break;
    case "/register":
      bgColorScheme = "white"
      schemeIsGreen = false
      break;
    default:
      var bgColorScheme = "sapp-green"
      schemeIsGreen = true
  }
  
  return (
    <>
        <div data-testid="Toolbar" className={`sticky pl-1/6 flex flex-box fixed inline-block overflow-auto float-left w-screen sticky bg-${!schemeIsGreen ? "sapp-green" : "white"}`}>
          <div className="flex items-center">
            <img data-testid="Collapser" className={`transition-colors duration-100 ease-in rounded-2xl w-10 my-6 mx-2 p-2 hover:cursor-pointer hover:bg-sapp-lime bg-${bgColorScheme}`} src={schemeIsGreen ? CollapseIcon : CollapseIconGreen} onClick={onCollapseClick}/>
          </div>
          <div className={`flex items-center ml-auto mr-${navbarOpen ? '20' : '0'}`}>
            <img data-testid="Logout" className={`transition-colors duration-100 ease-in rounded-2xl w-10 my-6 mx-2 p-2 hover:cursor-pointer hover:bg-sapp-lime bg-${bgColorScheme}`} src={schemeIsGreen ? LogoutIcon : LogoutIcon} onClick={onLogoutClick}/>
          </div>
        </div>
    </>
  );
};

export default Toolbar;
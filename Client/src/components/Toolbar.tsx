import React from 'react';
import CollapseIcon from '../assets/icons/navbar collapser.png'
import CollapseIconGreen from '../assets/icons/navbar collapser green.png'

import { useLocation } from 'react-router-dom';

interface toolbarProps {
    onButtonClick: () => void;
}

const Toolbar: React.FC<toolbarProps> = ({ onButtonClick }) => {
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
        <div data-testid="Toolbar" className={`sticky pl-1/6 fixed inline-block overflow-auto float-left w-screen sticky bg-${!schemeIsGreen ? "sapp-green" : "white"}`}>
            <img data-testid="Collapser" className={`rounded-2xl w-10 my-6 mx-2 p-2 bg-${bgColorScheme}`} src={schemeIsGreen ? CollapseIcon : CollapseIconGreen} onClick={onButtonClick}/>
        </div>
    </>
  );
};

export default Toolbar;
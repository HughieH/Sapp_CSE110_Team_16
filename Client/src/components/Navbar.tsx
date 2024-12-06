import React from 'react';
import SappLogo from '../assets/icons/sapp logo.png';
import DecksIcon from '../assets/icons/decks icon.png';
import TimersIcon from '../assets/icons/timers icon.png';
import ProfileIcon from '../assets/icons/profile icon.png';
import SappLogoGreen from '../assets/icons/sapp logo green.png';
import DecksIconGreen from '../assets/icons/decks icon green.png';
import TimersIconGreen from '../assets/icons/timers icon green.png';
import ProfileIconGreen from '../assets/icons/profile icon green.png';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname)

  var bgColorScheme = "sapp-green"
  var fgColorScheme = "white"
  var schemeIsGreen = true

  switch(location.pathname) {
    case "/login":
      bgColorScheme = "white"
      fgColorScheme = "sapp-green"
      schemeIsGreen = false
      break;
    case "/register":
      bgColorScheme = "white"
      fgColorScheme = "sapp-green"
      schemeIsGreen = false
      break;
    default:
      var bgColorScheme = "sapp-green"
      var fgColorScheme = "white"  
      schemeIsGreen = true
  }

  return (
    <>
      <nav data-testid='Navbar' className={`sticky h-full p-4 rounded-xl bg-${bgColorScheme} text-${fgColorScheme}`}>
        <div className="flex flex-col justify-between h-full">
          <Link data-testid="HomeIcon" to="/" className="hover:bg-sapp-lime rounded-3xl transition-colors duration-100 ease-in">
            <img
              className="w-14"
              src={schemeIsGreen ? SappLogo : SappLogoGreen}
            />
          </Link>

          <div className="flex flex-col justify-center mt-4 flex-grow">
            <Link data-testid="DecksIcon" to="/decks" className="hover:bg-sapp-lime rounded-3xl transition-colors duration-100 ease-in">
              <div className="py-8">
                <img
                  className="w-4/5 ml-[10%]"
                  src={schemeIsGreen ? DecksIcon : DecksIconGreen}
                />
                <h1 className={`font-bold text-base text-center text-${fgColorScheme}`}>Decks</h1>
              </div>
            </Link>
            <Link data-testid="TimerIcon" to="/timers" className="hover:bg-sapp-lime rounded-3xl transition-colors duration-100 ease-in">
              <div className="py-8">
                <img
                  className="w-4/5 ml-[10%]"
                  src={schemeIsGreen ? TimersIcon : TimersIconGreen}
                />
                <h1 className={`font-bold text-center text-${fgColorScheme}`}>Timers</h1>
              </div>
            </Link>
            <Link data-testid="ProfileIcon" to="/profile" className="hover:bg-sapp-lime rounded-3xl transition-colors duration-100 ease-in">
              <div className="py-8">
                <img
                  className="w-4/5 ml-[10%]"
                  src={schemeIsGreen ? ProfileIcon : ProfileIconGreen}
                />
                <h1 className={`font-bold text-center text-${fgColorScheme}`}>Profile</h1>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
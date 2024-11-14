import React from 'react';
import SappLogo from '../assets/icons/sapp logo.png'
import DecksIcon from '../assets/icons/decks icon.png'
import TimersIcon from '../assets/icons/timers icon.png'
import ProfileIcon from '../assets/icons/profile icon.png'

import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
        <div className="w-1/6 sm:w-1/6 md:w-1/12 inline-block align-sub bg-sapp-green text-white flex-col flex rounded-xl">
            <img onClick={() => navigate('/')} className="w-4/5 ml-[10%] mt-[10%] xl:w-3/5 xl:ml-[20%] xl:mt-[20%]" src={SappLogo}/>

            <div className="flex flex-col justify-end gap-x-36 flex-grow mt-4">
                <div className="flexbox py-16" onClick={() => navigate('/decks')}>
                    <img className="w-4/5 ml-[10%] xl:w-1/2 xl:ml-[25%]" src={DecksIcon}/>
                    <h1 className="font-bold align-center text-center">Decks</h1>
                </div>
                <div className="flexbox py-16" onClick={() => navigate('/timers')}>
                    <img className="w-4/5 ml-[10%] xl:w-1/2 xl:ml-[25%]" src={TimersIcon}/>
                    <h1 className="font-bold align-center text-center">Timers</h1>
                </div>
                <div className="flexbox py-16" onClick={() => navigate('/profile')}>
                    <img className="w-4/5 ml-[10%] xl:w-1/2 xl:ml-[25%]" src={ProfileIcon}/>
                    <h1 className="font-bold align-center text-center">Profile</h1>
                </div>
            </div>
        </div>
    </>
  );
};

export default Navbar;
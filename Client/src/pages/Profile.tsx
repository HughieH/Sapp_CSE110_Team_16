import React from 'react';
import ProfileIcon from '../assets/icons/profile icon.png'
import { useAuth } from '../context/AuthContext'; 
import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import EditProfileIcon from '../assets/icons/profile icon.png';

interface ProfileModalProps {
  show: boolean,
  onClose: () => void;
  onSave: (newUsername: string) => void;
}

const EditProfileModal: React.FC<ProfileModalProps> = ({ show, onClose, onSave }) => {
  const [username, setUsername] = useState("");
  const { currentUser } = useAuth();

  const handleSave = async () => {

    if (!currentUser) return;

    try {
      console.log(doc(db, 'users', currentUser.uid))
      /*await setDoc(doc(db, 'users', currentUser.uid), {
        name: username,
        email: currentUser.email,
        createdAt: currentUser.createdAt || new Date(),
        uid: currentUser.uid,
      });*/
    } catch (error) {
      console.error("Error rewriting username", error);
    }  

    onSave(username);
    onClose();
  };

  if (!show) return null;
  
  return (
    <div className={`modal-overlay ${show ? "show" : ""} absolute bg-sapp-lime rounded-2xl`}>
      <div className="modal">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-xl mx-4 my-2" required/>
            <button type="button" className="transition-colors ease-in-out transition-duration-100 bg-sapp-leaf text-white hover:bg-sapp-green rounded-xl px-2 font-bold mr-4" onClick={handleSave}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>  
  );
};

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0); 

  const fetchUserStats = async () => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log("Successfully retrieved user data.");
        setTotalStudyTime(userDoc.data().totalStudyTime);
      }
      else {
        console.log("UserDoc not found.");
      }
    } catch (error) {
      console.error("Error getting user data from Firestore:", error);
    }  
  };

  fetchUserStats()

  
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000); 
    const hours = Math.floor(totalSeconds / 3600); 
    const minutes = Math.floor((totalSeconds % 3600) / 60); 
    const seconds = totalSeconds % 60; 

    let timeString = `${hours}:${(minutes < 10) ? `0${minutes}` : `${minutes}`}:${(seconds < 10) ? `0${seconds}` : `${seconds}`}`;


    return timeString
  };

  // profile Modal & react form info for user editing username & profile pic
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("JohnDoe");

  const handleSaveUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <div data-testid="Profile" className="flex flex-col items-center min-h-screen bg-white text-black">
      <div data-testid="ProfileIcon" className="flex flex-col inline-block my-20 items-center justify-items w-72 h-42 p-5 bg-sapp-green rounded-3xl text-center text-nowrap">
        <div className="flex flex-col items-center align-center justify-items gap-2">
          <img className="w-32 rounded-full bg-sapp-lime hover:border-8 hover:border-double hover:border-sapp-green hover:cursor-pointer md-8" src={ProfileIcon}/>
          <div className="text-white font-bold text-xl hover:bg-sapp-lime hover:cursor-pointer hover:rounded-lg" onClick={() => setIsModalOpen(true)}>
            <h1>{currentUser ? currentUser.displayName : 'Log In'}</h1>
          </div>
        </div>
      </div>
      <div className="w-1/2 px-5 lg:px-16">
        <h1 data-testid="ProfileStatistics" className="text-5xl font-bold text-sapp-leaf pl-2 pb-5 ">
          Statistics
        </h1>
        <div data-testid="ProfileStats" className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 h-50 rounded-3xl gap-5 lg:gap-5">
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">
              0
            </h1>
            <h1 className="text-xl">
              Best Decks Streak
            </h1>
          </div>
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">
            {formatTime(totalStudyTime)}
            </h1>
            <h1 className="text-xl">
              Total Study Time
            </h1>
          </div>
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">
              0
            </h1>
            <h1 className="text-xl">
              Total XP
            </h1>
          </div>
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">
              0
            </h1>
            <h1 className="text-xl">
              Total Badges
            </h1>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-5xl font-bold text-sapp-deep pl-2 pb-5">
            Badges
          </h1>
          {(<div className="goober text-center font-style: italic text-sapp-deep">
            ...<br></br><br></br>
            You haven't collected any badges yet. Keep studying with Sapp to earn some!
            <br></br><br></br>...
          </div>)}
          {/*<div data-testid="ProfileAchievements" className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 h-50 rounded-3xl gap-5 lg:gap-5">
            <div className="inline-block bg-sapp-blue w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
              <h1 className="text-3xl">
                Achievement #1
              </h1>
            </div>
            <div className="inline-block bg-sapp-blue w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
              <h1 className="text-3xl">
                Achievement #2
              </h1>
            </div>
          </div>*/}
        </div>
      </div>
      <EditProfileModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUsername}
      />    
    </div>
  );
};

export default Profile;
import React from 'react';
import ProfileIcon from '../assets/icons/profile icon.png';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // 리다이렉트 위해 추가

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchTotalStudyTime = async () => {
      if (!currentUser) return;

      try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setTotalStudyTime(data.totalStudyTime || 0);
        }
      } catch (error) {
        console.error('Error fetching total study time:', error);
      }
    };

    fetchTotalStudyTime();
  }, [currentUser]);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  const handleRecommendClick = () => {
    navigate('/recommend'); // /recommend로 리다이렉트
  };

  return (
    <div data-testid="Profile" className="flex flex-col items-center min-h-screen bg-white text-black">
      <div
        data-testid="ProfileIcon"
        className="flex flex-col pt-5 px-20 my-20 items-center justify-items w-72 h-42 bg-sapp-green rounded-3xl text-center text-nowrap"
      >
        <img className="w-28" src={ProfileIcon} />
        <div className="text-white font-bold text-xl flex items-center gap-2">
          <h1>{currentUser ? currentUser.displayName || currentUser.email : 'Log In'}</h1>
          {/* 추천 버튼 */}
          <button
            onClick={handleRecommendClick}
            className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600"
            title="Go to Recommendations"
          >
            R
          </button>
        </div>
      </div>
      <div className="px-5 w-5/6">
        <h1 data-testid="ProfileStatistics" className="text-5xl font-bold text-sapp-leaf pl-2 pb-5">
          Statistics
        </h1>
        <div
          data-testid="ProfileStats"
          className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 h-50 rounded-3xl gap-5 lg:gap-5"
        >
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">0</h1>
            <h1 className="text-xl">Streak</h1>
          </div>
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">{formatTime(totalStudyTime)}</h1>
            <h1 className="text-xl">Total Study Time</h1>
          </div>
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">0</h1>
            <h1 className="text-xl">Total XP</h1>
          </div>
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">0</h1>
            <h1 className="text-xl">Total Badges</h1>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-5xl font-bold text-sapp-deep pl-2 pb-5">Achievements</h1>
          <div
            data-testid="ProfileAchievements"
            className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 h-50 rounded-3xl gap-5 lg:gap-5"
          >
            <div className="inline-block bg-sapp-blue w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
              <h1 className="text-3xl">Achievement #1</h1>
            </div>
            <div className="inline-block bg-sapp-blue w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
              <h1 className="text-3xl">Achievement #2</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

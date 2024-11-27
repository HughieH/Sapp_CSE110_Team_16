import React from 'react';
import ProfileIcon from '../assets/icons/profile icon.png'

const Profile = () => {
  return (
    <div data-testid="Profile" className="flex flex-col items-center min-h-screen bg-white text-black">
      <div data-testid="ProfileIcon" className="flex flex-col pt-5 px-20 my-20 items-center justify-items w-72 h-42 bg-sapp-green rounded-3xl text-center text-nowrap">
        <img className="w-28" src={ProfileIcon}/>
        <div className="text-white font-bold text-xl"><h1>YOUR NAME</h1></div>
      </div>
      <div className="px-5 w-5/6">
        <h1 data-testid="ProfileStatistics" className="text-5xl font-bold text-sapp-leaf pl-2 pb-5">
          Statistics
        </h1>
        <div data-testid="ProfileStats" className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 h-50 rounded-3xl gap-5 lg:gap-5">
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">
              0
            </h1>
            <h1 className="text-xl">
              Streak
            </h1>
          </div>
          <div className="inline-block bg-sapp-lime w-50 h-32 rounded-3xl text-center align-middle flex-col flex justify-center gap-1">
            <h1 className="text-5xl font-semibold">
              0
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
            Achievements
          </h1>
          <div data-testid="ProfileAchievements" className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 h-50 rounded-3xl gap-5 lg:gap-5">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
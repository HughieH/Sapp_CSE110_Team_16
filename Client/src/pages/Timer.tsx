import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]); // Array to store lap times
  const [sessionTime, setSessionTime] = useState<number>(0); // Time studied in this session
  const [weeklyTime, setWeeklyTime] = useState<number>(
    Number(localStorage.getItem("weeklyTime")) || 0
  ); // Time studied this week
  const { currentUser } = useAuth();

  // Convert time to MM:SS:ms format
  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((milliseconds % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor((milliseconds % 1000) / 10) // Divide by 10 to get two digits
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}:${ms}`;
  };

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 ms
        setSessionTime((prevSessionTime) => prevSessionTime + 10);
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  // Save weeklyTime to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("weeklyTime", String(weeklyTime));
  }, [weeklyTime]);

  // Save data to Firestore
  const saveTimeToFirestore = async (totalTime: number) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const existingTotalTime = userDoc.data().totalStudyTime || 0;
        await updateDoc(userRef, {
          totalStudyTime: existingTotalTime + totalTime, // Add session time to total
        });
      } else {
        await setDoc(userRef, {
          totalStudyTime: totalTime, // Create totalStudyTime if it doesn't exist
        });
      }
      console.log("Study time saved to Firestore");
    } catch (error) {
      console.error("Error saving study time to Firestore:", error);
    }
  };

  // Reset the timer
  const resetTimer = (): void => {
    setIsRunning(false);
    setTime(0);
    setLaps([]); // Clear lap times
    setWeeklyTime((prevWeeklyTime) => prevWeeklyTime + sessionTime); // Add session time to weekly total
    saveTimeToFirestore(sessionTime); // Save session time to Firestore
    setSessionTime(0); // Reset session time
  };

  // Add a lap
  const addLap = (): void => {
    setLaps((prevLaps) => [...prevLaps, time]); // Append current time to laps
  };

  // Save time when the component unmounts
  useEffect(() => {
    return () => {
      if (sessionTime > 0) {
        saveTimeToFirestore(sessionTime);
      }
    };
  }, [sessionTime]);

  return (
    <div className='h-[calc(100vh-88px)] flex flex-col'>
      {/* Time Stats */}
      <div className='fixed flex flex-col bg-white items-end justify-end'>
        <div className="top-4 right-4 p-4 bg-green-100 rounded-2xl w-fit m-4">
          <p className="text-green-800 font-bold">
            Total Time This Session: {formatTime(sessionTime)}
          </p>
          <p className="text-green-800 font-bold">
            Total Time This Week: {formatTime(weeklyTime)}
          </p>
        </div>
      </div>
      <div
        data-testid="Timer"
        className="bg-white flex flex-col flex-grow justify-center items-center"
      >
        {/* Timer header */}
        <h2
          className={`${
            isRunning
              ? "bg-yellow-200 text-yellow-700"
              : "bg-green-200 text-green-700"
          } w-5/12 h-14 rounded-2xl text-3xl text-center font-bold tracking-wide uppercase flex items-center justify-center`}
        >
          {isRunning ? "Studying..." : "Study! Lock in >:)"}
        </h2>

        {/* Timer display */}
        <div
          className={`${
            isRunning
              ? "border-yellow-200 text-yellow-900"
              : "border-green-200 text-green-900"
          } w-5/12 h-32 border-4 rounded-2xl text-center text-7xl font-bold mt-2 bg-white px-6 py-2 flex items-center justify-center`}
        >
          {formatTime(time)}
        </div>

        {/* Timer controls */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-32 px-4 py-2 rounded-lg text-white font-bold ${
              isRunning ? "bg-yellow-500" : "bg-green-500"
            } transform hover:scale-110 transition duration-300`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="w-32 px-4 py-2 bg-red-500 rounded-lg text-white font-bold 
            transform hover:scale-110 transition duration-300"
          >
            Finish
          </button>
          <button
            onClick={addLap}
            className="w-32 px-4 py-2 bg-blue-500 rounded-lg text-white font-bold 
            transform hover:scale-110 transition duration-300"
          >
            Lap
          </button>
        </div>

        {/* Lap times */}
        <div className="mt-8 w-5/12">
          <h3 className="text-xl font-bold mb-2 text-center">Lap Times</h3>
          <ul className="list-decimal list-inside bg-gray-100 p-4 rounded-lg">
            {laps.length > 0 ? (
              laps.map((lap, index) => (
                <li key={index} className="text-lg font-mono">
                  Lap {index + 1}: {formatTime(lap)}
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No laps recorded</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timer;

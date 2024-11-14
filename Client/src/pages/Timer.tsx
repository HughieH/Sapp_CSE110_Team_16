import React, { useState, useEffect } from "react";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Convert time to MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  // Reset the timer
  const resetTimer = (): void => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800">
      <div className="bg-green-200 p-6 rounded-2xl text-center shadow-lg relative">
        <h2 className="text-md font-semibold text-green-700 tracking-wide uppercase">
          {isRunning ? "...Studying..." : "Study!"}
        </h2>
        <div className="text-5xl font-bold bg-gray-100 text-green-900 mt-2 border-4 border-green-400 rounded-lg px-6 py-2 inline-block">
          {formatTime(time)}
        </div>
    </div>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            isRunning ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 rounded-lg text-white font-semibold"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

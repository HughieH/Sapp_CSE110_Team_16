import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false);

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
      }, 10);
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
    <div className="bg-white flex flex-col justify-center items-center h-screen">
      <h2
        className={`${
          isRunning
            ? "bg-yellow-200 text-yellow-700"
            : "bg-green-200 text-green-700"
        } w-5/12 h-14 rounded-2xl text-3xl text-center font-bold tracking-wide uppercase flex items-center justify-center`}
      >
        {isRunning ? "Studying..." : "Study! Lock in >:)"}
      </h2>

      <div
        className={`${
          isRunning ? "border-yellow-200 text-yellow-900" : "border-green-200 text-green-900"
        } w-5/12 h-32 border-4 rounded-2xl text-center text-7xl font-bold  mt-2 bg-white px-6 py-2 flex items-center justify-center`}
      >
          {formatTime(time)}
      </div>

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
      </div>
    </div>
  );
};

export default Timer;

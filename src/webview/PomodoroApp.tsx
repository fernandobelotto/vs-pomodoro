import React, { useState, useEffect } from "react";

const PomodoroApp = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Pomodoro Timer</h2>
      <div style={{ fontSize: "48px", margin: "20px 0" }}>
        {formatTime(timeLeft)}
      </div>
      <div>
        <button
          onClick={toggleTimer}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            fontSize: "16px",
          }}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroApp;

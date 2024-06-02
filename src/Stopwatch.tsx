import React, { useState, useEffect } from 'react';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [label, setLabel] = useState("Work Time");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    if (time >= 3000 && label === "Work Time") {
      setLabel("Break Time");
      setTime(0);
      setIsRunning(false);
      setTimeout(() => {
        setIsRunning(true);
      }, 1000); // Delay to show the transition
    } else if (time >= 1000 && label === "Break Time") {
      setLabel("Work Time");
      setTime(0);
      setIsRunning(false);
      setTimeout(() => {
        setIsRunning(true);
      }, 1000); // Delay to show the transition
    }
  }, [time, label]);

  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 100);
    const milliseconds = time % 100;
    return `${seconds}:${milliseconds < 10 ? `0${milliseconds}` : milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>{label}</h1>
      <h2>{formatTime(time)}</h2>
    </div>
  );
};

export default Stopwatch;

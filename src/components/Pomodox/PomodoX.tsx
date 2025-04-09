import { useState, useEffect, useRef } from "react";
import "./style.css";

const PomodoX = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeLeft((isWorkTime ? workDuration : breakDuration) * 2);
  }, [workDuration, breakDuration, isWorkTime]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current!);
            playAudio();
            setIsRunning(false);
            if (!isWorkTime) {
              setCyclesCompleted((c) => {
                console.log(c);
                return c + 1;
              });
            }
            setIsWorkTime(!isWorkTime);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current!);
  }, [isRunning, isWorkTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setIsWorkTime(true);
    setTimeLeft(workDuration * 60);
    setCyclesCompleted(0);
  };

  const playAudio = () => {
    const audio = new Audio("/alert.mp3");
    audio.play();
  };

  return (
    <div className="container">
      <h1>PomodoX Clock</h1>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="session-label">
        Session: {isWorkTime ? "Work" : "Break"}
      </div>
      <div className="controls">
        <button onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="cycle-counter">
        <p>Cycles Completed: {cyclesCompleted}</p>
      </div>
      <div className="custom-settings">
        <div>
          <label>Work Duration (minutes):</label>
          <input
            type="number"
            min={1}
            value={workDuration}
            onChange={(e) => setWorkDuration(Math.max(1, +e.target.value))}
          />
        </div>
        <div>
          <label>Break Duration (minutes):</label>
          <input
            type="number"
            min={1}
            value={breakDuration}
            onChange={(e) => setBreakDuration(Math.max(1, +e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoX;

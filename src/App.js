import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const BUTTONS = {
    START: "START",
    PAUSE: "PAUSE",
    RESUME: "RESUME",
    STOP: "STOP",
    RESET: "RESET",
  }
  const COUNTDOWN_STATES = {
    STARTED: "STARTED",
    PAUSED: "PAUSED",
    RESUMED: "RESUMED",
    STOPPED: "STOPPED",
    RESET: "RESET",
    END: "END"
  }
  const INITIAL_INPUT_VALUE = 0;

  const [countdown, setCountdown] = useState(INITIAL_INPUT_VALUE);
  const [countdownState, setCountdownState] = useState(null)
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    if(!countdown && intervalId) {
      clearInterval(intervalId);
      setCountdownState(COUNTDOWN_STATES.END)
    }
  }, [countdown, intervalId]);

  const onChangeInputHandler = (e) => {
    setCountdown(e.target.value);
  }

  const handleStart = () => {
    if(!countdown) return;
    setCountdownState(COUNTDOWN_STATES.STARTED)
    startinterval();
  }

  const handlePause = () => {
    setCountdownState(COUNTDOWN_STATES.PAUSED)
    clearInterval(intervalId);
  }

  const handleResume = () => {
    setCountdownState(COUNTDOWN_STATES.RESUMED)
    startinterval();
  }

  const handleStop = () => {
    setCountdownState(COUNTDOWN_STATES.STOPPED)
    clearInterval(intervalId);
  }

  const handleReset = () => {
    setCountdownState(COUNTDOWN_STATES.RESET)
    setCountdown(INITIAL_INPUT_VALUE);
    setIntervalId(null);
  }

  const startinterval = () => {
    if(!countdown) return;
    const interval = setInterval(() => {
        setCountdown((prevTimer) => {
          if(prevTimer !== 0){
            return prevTimer - 1;
          }
        })
    }, 1000)
    setIntervalId(interval);
  }

  const showInput = countdownState === null || countdownState === COUNTDOWN_STATES.RESET;
  const showCountdownText = !showInput;
  const showPause = countdownState === COUNTDOWN_STATES.STARTED || countdownState === COUNTDOWN_STATES.RESUMED;
  const showResume = countdownState === COUNTDOWN_STATES.PAUSED;
  const showStop = countdownState === COUNTDOWN_STATES.STARTED || countdownState === COUNTDOWN_STATES.PAUSED || countdownState === COUNTDOWN_STATES.RESUMED;
  const showReset = countdownState === COUNTDOWN_STATES.STOPPED || countdownState === COUNTDOWN_STATES.END;
  return (
    <div className="App">
      {showInput && <div><input type="text" value={countdown} onChange={onChangeInputHandler} /></div>}
      {showCountdownText && <div className="timerText">Countdown: {countdown}</div>}
      <div>
        {showInput && <input type="button" value={BUTTONS.START} onClick={handleStart}/>}
        {showPause && <input type="button" value={BUTTONS.PAUSE} onClick={handlePause}/>}
        {showResume && <input type="button" value={BUTTONS.RESUME} onClick={handleResume}/>}
        {showStop && <input type="button" value={BUTTONS.STOP} onClick={handleStop}/>}
        {showReset && <input type="button" value={BUTTONS.RESET} onClick={handleReset}/>}
      </div>
    </div>
  );
}

export default App;

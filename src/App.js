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

  // stop countdown when it reaches 0 and set countdown state to END
  useEffect(() => {
    if(!countdown && intervalId) {
      clearInterval(intervalId);
      setCountdownState(COUNTDOWN_STATES.END)
    }
  }, [countdown, intervalId]);

  const onChangeInputHandler = (e) => {
    setCountdown(e.target.value);
  }

  // set countdown state to STARTED and start countdown
  const handleStart = () => {
    if(!countdown) return;
    setCountdownState(COUNTDOWN_STATES.STARTED)
    startinterval();
  }

  // set countdown state to PAUSED and clear countdown
  const handlePause = () => {
    setCountdownState(COUNTDOWN_STATES.PAUSED)
    clearInterval(intervalId);
  }

  // set countdown state to RESUMED and start countdown
  const handleResume = () => {
    setCountdownState(COUNTDOWN_STATES.RESUMED)
    startinterval();
  }

  // set countdown state to STOPPED and clear countdown
  const handleStop = () => {
    setCountdownState(COUNTDOWN_STATES.STOPPED)
    clearInterval(intervalId);
  }

  // set countdown state to RESET and reset countdown values
  const handleReset = () => {
    setCountdownState(COUNTDOWN_STATES.RESET)
    setCountdown(INITIAL_INPUT_VALUE);
    setIntervalId(null);
  }

  // countdown by 1 every second
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

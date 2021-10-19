import React, {useState, useRef, useEffect} from 'react';
import './App.css';

function App() {
  const BUTTONS = {
    START: "START",
    PAUSE: "PAUSE",
    RESUME: "RESUME",
    STOP: "STOP",
    RESET: "RESET",
  }
  const INITIAL_INPUT_VALUE = 0;

  const [timerInput, setTimerInput] = useState(INITIAL_INPUT_VALUE);
  const [showInput, setShowInput] = useState(true)
  const [showStart, setShowStart] = useState(true)
  const [showPause, setShowPause] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [showStop, setShowStop] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const intervalID = useRef(null);

  useEffect(() => {
    if(!timerInput && !intervalID) {
      clearInterval(intervalID.current);
    }
  }, [timerInput]);

  const onChangeInputHandler = (e) => {
    setTimerInput(e.target.value);
  }

  const startTimer = () => {
    setShowStart((value) => !value);
    setShowInput(false);
    setShowPause(true);
    setShowStop(true);
    startinterval();
  }

  const startinterval = () => {
    intervalID.current = setInterval(()=>{
      setTimerInput((prevTimer) => {
          if(prevTimer !== 0){
            return prevTimer - 1;
          }
          clearInterval(intervalID.current);
        })
    }, 1000)
  }

  const handlePause = () => {
    setShowPause(false);
    setShowResume(true);
    clearInterval(intervalID.current);
  }

  const handleResume = () => {
    setShowPause(true);
    setShowResume(false);
    startinterval();
  }

  const handleStop = () => {
    setShowStop(false);
    setShowPause(false);
    setShowResume(false);
    setShowReset(true);
    clearInterval(intervalID.current);
  }

  const handleReset = () => {
    setShowReset(false);
    setShowStart(true);
    setShowInput(true);
    setTimerInput(INITIAL_INPUT_VALUE);
  }

  // if intervalId === null, then showInput
  // if intervalId exists, then showpause/showresume and showStop 

  return (
    <div className="App">
      {showInput && <div><input type="text" value={timerInput} onChange={onChangeInputHandler} /></div>}
      {!showInput && <div className="timerText">Countdown: {timerInput}</div>}
      <div>
        {showStart && <input type="button" value={BUTTONS.START} onClick={startTimer}/>}
        {showPause && <input type="button" value={BUTTONS.PAUSE} onClick={handlePause}/>}
        {showResume && <input type="button" value={BUTTONS.RESUME} onClick={handleResume}/>}
        {showStop && <input type="button" value={BUTTONS.STOP} onClick={handleStop}/>}
        {showReset && <input type="button" value={BUTTONS.RESET} onClick={handleReset}/>}
      </div>
    </div>
  );
}

export default App;

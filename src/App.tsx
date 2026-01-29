import { useEffect, useState, useRef } from 'react'
import './App.css'
import PomodoroForm from './PomodoroForm';
import type { Form } from './PomodoroForm';
import { Timer } from 'timer-node'

function App() {
  const [formState, setFormState] = useState<Form>({
    totalTime: 0,
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  });

  const PomodoroState = {
    Waiting: 'waiting',
    Focus: 'focus',
    OnShortBreak: 'onShortBreak',
    OnLongBreak: 'onLongBreak',
  } as const;

  const FOCUS_TIME = formState.pomodoroTime * 60; // in seconds
  const SHORT_BREAK_TIME = formState.shortBreakTime * 60; // in seconds
  const LONG_BREAK_TIME = formState.longBreakTime * 60; // in seconds

  const [pomodoriCount, setPomodoriCount] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);

  // TODO: Cleaner alternative to enums. Tired of this keyof typeof nonsense AGAIN
  const [pomodoroState, setPomodoroState] = useState<typeof PomodoroState[keyof typeof PomodoroState]>(PomodoroState.Waiting);

  const onStart = () => {
    setPomodoroState(PomodoroState.Focus);
  };

  useEffect(() => {
    if (pomodoroState === PomodoroState.Waiting) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      console.log('waiting');
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          console.log("complete");
          return 0;
        }
        return prev - 1
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

  }, [pomodoroState]);

  const reset = () => {
    setPomodoroState(PomodoroState.Waiting);
    setTimeLeft(FOCUS_TIME);
    setPomodoriCount(0);
  }

  const skip = () => {
    if (pomodoroState === PomodoroState.Focus) {
      setPomodoriCount((count) => count + 1);
      if ((pomodoriCount + 1) % 4 === 0) {
        setPomodoroState(PomodoroState.OnLongBreak);
        setTimeLeft(LONG_BREAK_TIME);
      } else {
        setPomodoroState(PomodoroState.OnShortBreak);
        setTimeLeft(SHORT_BREAK_TIME);
      }
    }
  }

  return (
    <>
      <div>
        Tomato here
      </div>
      <div>{pomodoroState}</div>
      <div>{new Date(timeLeft * 1000).toISOString().slice(14, 19)}</div>
      {/*pomodoroState === PomodoroState.Waiting && <PomodoroForm formState={formState} setFormState={setFormState} />*/}
      <button onClick={() => setPomodoroState(PomodoroState.Focus)}>Start</button>
      <button onClick={() => setPomodoroState(PomodoroState.Waiting)}>Pause</button>
      <button onClick={skip}>Skip</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

export default App;

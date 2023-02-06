import { createContext, Dispatch, SetStateAction, useState } from 'react';

export type TimerContextType = {
  isTimer: boolean;
  setIsTimer: Dispatch<SetStateAction<boolean>>;
  isTimerDone: boolean;
  setIsTimerDone: Dispatch<SetStateAction<boolean>>;
};

export const TimerContext = createContext({} as TimerContextType);

type Props = {
  children: JSX.Element;
};

const TimerProvider = ({ children }: Props) => {
  const [isTimer, setIsTimer] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(false);

  return (
    <TimerContext.Provider value={{ isTimer, setIsTimer, isTimerDone, setIsTimerDone }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;

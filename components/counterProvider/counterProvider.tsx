import { createContext, Dispatch, SetStateAction, useState } from "react";

export type CounterContextType = {
  isTimer: boolean;
  setIsTimer: Dispatch<SetStateAction<boolean>>;
  isTimerDone: boolean;
  setIsTimerDone: Dispatch<SetStateAction<boolean>>;
};

export const CounterContext = createContext({} as CounterContextType);

type Props = {
  children: JSX.Element;
};

const CounterProvider = ({ children }: Props) => {
  const [isTimer, setIsTimer] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(false);

  return (
    <CounterContext.Provider
      value={{ isTimer, setIsTimer, isTimerDone, setIsTimerDone }}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;

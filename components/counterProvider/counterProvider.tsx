import { createContext, useState } from "react";

export const CounterContext = createContext<any | null>(null);

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

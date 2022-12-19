import { createContext, useState } from "react";

export const CounterContext = createContext<any | null>(null);

type Props = {
  children: JSX.Element;
};

const CounterProvider = ({ children }: Props) => {
  const [isTimer, setIsTimer] = useState(false);

  return (
    <CounterContext.Provider value={{ isTimer, setIsTimer }}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;

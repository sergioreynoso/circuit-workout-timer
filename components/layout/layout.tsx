import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-lg py-0 mx-auto px-04">{children}</div>;
}

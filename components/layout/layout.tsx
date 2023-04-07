import { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto h-full max-w-lg">{children}</div>;
}

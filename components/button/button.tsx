import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  intent: 'primary' | 'secondary';
};

function Button({ intent, children, ...delegated }: Props) {
  const variant = {
    primary: {
      text: 'text-amber-900',
      bg: 'bg-amber-500',
    },
    secondary: {
      text: 'text-green-500',
      bg: 'bg-green-900',
    },
  };

  return (
    <button
      className={`h-16 flex-grow rounded-2xl ${variant[intent].text} text-xl font-extrabold leading-7 ${variant[intent].bg}`}
      {...delegated}
    >
      {children}
    </button>
  );
}

export default Button;
